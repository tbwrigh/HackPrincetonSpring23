import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDetail = ({ recipe }) => {
    console.log(recipe)
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{recipe.name}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.ingredients}>{recipe.ingredients}</Text>
      <Text style={styles.instructions}>{recipe.instructions}</Text>
      <Text style={styles.nutrition}>{recipe.nutrition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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