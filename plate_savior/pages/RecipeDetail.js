import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    async function getRecipe() {
      const recipe = await AsyncStorage.getItem('detail');
      setRecipe(JSON.parse(recipe));
    }
    getRecipe();
  }, []);

  return (
    <SafeAreaView style={styles.contain}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.subtitle}>{recipe.cuisine} {recipe.meal}</Text>
          {recipe.ingredients.map((ingredient, index) => {
              return (
                <Text key={index} style={styles.ingredients}>{ingredient[1]} {ingredient[0]}</Text>
              );
            })}
          {recipe.steps.map((step, index) => {
              return (
                <Text key={index} style={styles.ingredients}>{step}</Text>
              );
            })}
          <Text style={styles.nutrition}>{recipe.nutrition}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    marginBottom: 10
  },
  ingredients: {
    fontSize: 18,
    marginBottom: 10
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10
  },
  nutrition: {
    fontSize: 18
  }
});

export default RecipeDetail;