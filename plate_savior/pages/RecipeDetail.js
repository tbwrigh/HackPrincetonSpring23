import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

const RecipeDetail = (rp) => {

  recipe = rp["route"]["params"]["rp"]

  return (
    <SafeAreaView style={styles.contain}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.subtitle}>{recipe.cuisine} {recipe.meal}</Text>
          <Text style={styles.description}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => {
              return (
                <Text key={index} style={styles.ingredients}>{ingredient[1]} {ingredient[0]}</Text>
              );
            })}
          <Text style={styles.description}>Instructions:</Text>
          {recipe.steps.map((step, index) => {
              return (
                <Text key={index} style={styles.ingredients}>{step}</Text>
              );
            })}
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
    marginBottom: 10,
    fontWeight: 'bold'
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