import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({ recipe }) => {
  // let { cuisine,meal,name,total_time,prep_time,cook_time,difficulty,serving,rating,ingredients,steps,calories, cost } = recipeProp;

  const navigation = useNavigation();

  const [saved, setSaved] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [dummyState, setDummyState] = useState(false);

  const handleSaveRecipe = async () => {
    if (removeButton) {
      try {
        let recipes = await AsyncStorage.getItem('saved_recipes');
        if (recipes != null && recipes.includes(recipe["_id"])) {
          r = recipes.split(";");
          r = r.filter(item => item !== recipe["_id"]);
          recipes = r.join(";");
          await AsyncStorage.setItem('saved_recipes', recipes);
        }
        setSaved(false);
      } catch (error) {
        console.log(error);
      }
    }else {
      try {
        let recipes = await AsyncStorage.getItem('saved_recipes');
        if (recipes == null) {
          recipes = recipe["_id"];
        }else {
          recipes+=";"+recipe["_id"];
        }
        await AsyncStorage.setItem('saved_recipes', recipes);
        setSaved(true);
      } catch (error) {
        console.log(error);
      }
    }
    setRemoveButton(!removeButton);
  };

  const showDetail = async () => {
    navigation.navigate("RecipeDetail", { rp: recipe });
  }


  useEffect(() => {
    async function checkSaved() {
      let recipes = await AsyncStorage.getItem('saved_recipes');
      if (recipes != null) {
        recipes = recipes.split(";");
        if (recipes.includes(recipe["_id"])) {
          setSaved(true);
          setRemoveButton(true);
        }
      }
    }
    checkSaved();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.saveButton, saved && styles.saveButtonSaved]}
        onPress={handleSaveRecipe}
      >
        <Ionicons name={saved ? "checkmark" : "add"} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDetail}>
      <Text style={styles.limw}>recipe</Text>
      <Text style={styles.title}>{recipe["name"]}</Text>
      <Text style={styles.subtitle}>{recipe["cuisine"]} {recipe["meal"]}</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Total Time:</Text>
          <Text style={styles.infoText}>{recipe["total_time"]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Serving:</Text>
          <Text style={styles.infoText}>{recipe["serving"]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={styles.infoText}>{recipe["rating"]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Calories:</Text>
          <Text style={styles.infoText}>{recipe["calories"]}</Text>
          <Text style={{ display: "none" }}>{dummyState}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 30,
    width: '83%',
  },
  subtitle: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 10,
    width: '83%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  info: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
  },
  saveButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonSaved: {
    backgroundColor: 'green',
  },
  plus: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  limw: {
    width: '85%',
  }
});

export default RecipeCard;
