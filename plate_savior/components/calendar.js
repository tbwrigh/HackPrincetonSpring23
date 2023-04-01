import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Day = ({ day, recipeIds }) => {
  const navigation = useNavigation();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = () => {
    storeDay(day);
    navigation.navigate('SelectRecipe', {recipes: recipeIds});
  }

  const storeDay = async (day) => {
    try {
      await AsyncStorage.setItem('selectedDay', day);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayText}>{day}</Text>
      <TouchableOpacity onPress={() => handleRecipeSelect(day)}>
        <Text style={styles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
      {selectedRecipe && <Text>Selected Recipe: {selectedRecipe}</Text>}
    </View>
  );
};

const Calendar = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let [recipeIds, setRecipeIds] = useState("");
  let [dayRecipe, setDayRecipe] = useState({});

    // make method to get saved_recipes from AsyncStorage
    useEffect(() => {  
        async function getRecipes() {
            let recipes = await AsyncStorage.getItem('saved_recipes');
            if (recipes != null) {
                setRecipeIds(recipes);
            }else {
                console.log("no saved recipes")
                setRecipeIds("")
            }
        }
        async function getDayRecipe() {
            let day = await AsyncStorage.getItem('selectedDay');
            let recipe = await AsyncStorage.getItem('selectedRecipe');
            if (dayRecipe != null && recipe != null) {
                let dr = await AsyncStorage.getItem('dayRecipe');
                if (dr != null) {
                    dayRecipe = JSON.parse(dr);
                    if (dayRecipe[day] != null) {
                        dayRecipe[day].push(recipe);
                    }else {
                        dayRecipe[day] = [recipe];
                    }
                    await AsyncStorage.setItem('dayRecipe', JSON.stringify(dayRecipe));
                }else {
                    dayRecipe = {};
                    dayRecipe[day] = [recipe];
                    await AsyncStorage.setItem('dayRecipe', JSON.stringify(dayRecipe));
                }
            }else {
                await AsyncStorage.removeItem('selectedDay');
                await AsyncStorage.removeItem('selectedRecipe');
            }
        }

        getRecipes();
        getDayRecipe();
    }, []);


    recipeIds = recipeIds.split(";");
    console.log(recipeIds)




  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <Day key={index} day={day} recipeIds={recipeIds} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default Calendar;
