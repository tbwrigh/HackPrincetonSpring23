import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingList = () => {
  const [dayRecipe, setDayRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchDayRecipe() {
      const dayRecipeJson = await AsyncStorage.getItem('dayRecipe');
      if (dayRecipeJson == null) return;
      const dayRecipeObj = JSON.parse(dayRecipeJson);
      setDayRecipe(dayRecipeObj);
    }

    fetchDayRecipe();
  }, []);

  useEffect(() => {
    if (dayRecipe == null) return;
    const ingredientList = [];

    for (const [day, recipes] of Object.entries(dayRecipe)) {
      recipes.forEach((recipe) => {
        const recipeIngredients = JSON.parse(recipe).ingredients;
        recipeIngredients.forEach((ingredient) => {
          const [ingredientName, ingredientQuantity] = ingredient;
          const existingIngredientIndex = ingredientList.findIndex(
            (item) => item.name === ingredientName
          );
          if (existingIngredientIndex >= 0) {
            const existingIngredient = ingredientList[existingIngredientIndex];
            existingIngredient.quantity += ingredientQuantity;
          } else {
            ingredientList.push({
              name: ingredientName,
              quantity: ingredientQuantity,
            });
          }
        });
      });
    }

    setIngredients(ingredientList);
  }, [dayRecipe]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredient List</Text>
      {ingredients.map((ingredient, index) => (
        <View style={styles.bulletPointRow}>
          <Text style={styles.bulletPoint}>• </Text>
          <Text key={index} style={styles.listItem}>
            {`${ingredient.name}`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 20,
  },
  bulletPointRow: {
    flexDirection: 'row',
  },
  bulletPoint: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },
  listItem: {
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 20,
    padding: 5,
  },
});

export default ShoppingList;
