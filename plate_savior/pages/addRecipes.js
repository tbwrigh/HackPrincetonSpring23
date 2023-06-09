import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../components/recipeCard';

const AddRecipes = () => {
  const [data, setData] = useState([]);
  let cost, skill, time, allergens, cuisine;

  useEffect(() => {
    async function fetchData() {
    // console.log("fetch data begin")
    // load values from AsyncStorage
    cost = await AsyncStorage.getItem('price');
    skill = await AsyncStorage.getItem('skillLevel');
    time = await AsyncStorage.getItem('timeToCook');
    allergens = await AsyncStorage.getItem('allergens');
    cuisines = await AsyncStorage.getItem('cuisines');
    meals = await AsyncStorage.getItem('meals');
    allergens = JSON.parse(allergens);
    meals = JSON.parse(meals);
    cuisines = JSON.parse(cuisines);
    cuisine = cuisines.join(",");
    meal = meals.join(",") 

    skill = skill == 1 ? "easy" : skill == 2 ? "medium" : skill == 3 ? "hard" : "expert";

    // fetch recipes from api
    // make get request to 10.25.13.105 
    res = await fetch('http://10.25.13.105:3000/query/' + "$".repeat(cost) + "/" + skill + "/" + cuisine + "/" + meal);
    // console.log(res);
    recipes = await res.json();
    // console.log(recipes["recipes"]);
    setData(recipes["recipes"]);
    }
    // console.log("fetching data")
    fetchData();
    // console.log(data)

  }, []);

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      {data && data.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe["_id"]} />
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  });
  
  export default AddRecipes;