import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const AddRecipes = () => {
  const [data, setData] = useState([]);
  let cost, skill, time, allergens, cuisine;

  useEffect(() => {
    async function fetchData() {
    console.log("fetch data begin")
    // load values from AsyncStorage
    cost = await AsyncStorage.getItem('price');
    skill = await AsyncStorage.getItem('skillLevel');
    time = await AsyncStorage.getItem('timeToCook');
    allergens = await AsyncStorage.getItem('allergens');
    cuisine = "tex-mex";

    skill = skill == 1 ? "easy" : skill == 2 ? "medium" : skill == 3 ? "hard" : "expert";

    console.log(cost, skill, time, allergens, cuisine);
    // fetch recipes from api
    // make get request to 10.25.13.105 
    res = await fetch('http://10.25.13.105:3000/query/' + "$".repeat(cost) + "/" + skill + "/" + cuisine);
    console.log(res);
    recipes = await res.json();
    setData(recipes);
    }
    console.log("fetching data")
    fetchData();

  }, []);

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default AddRecipes;