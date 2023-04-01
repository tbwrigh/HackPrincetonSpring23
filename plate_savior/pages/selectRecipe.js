import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SelectRecipe( recipes ) {
  recipes = recipes.route.params.recipes;
  console.log(recipes)

  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const promises = recipes.map(id => getRecipe(id));
      const resolvedRecipes = await Promise.all(promises);
      setRecipeList(resolvedRecipes);
    }

    async function getRecipe(id) {
      const res = await fetch('http://10.25.13.105:3000/recipe/' + id);
      const { recipe } = await res.json();
      return recipe;
    }

    getRecipes();
  }, [recipes]);

  function handleRecipeSelectPageSelect(id) {
    navigation.navigate('RecipeSelectPage', { recipeId: id });
  }

  console.log(recipeList)

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      {recipeList.map(recipe => (
        <TouchableOpacity key={recipe._id} style={styles.button} onPress={() => handleRecipeSelectPageSelect(recipe._id)}>
          <Text style={styles.buttonText}>{recipe.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SelectRecipe;
