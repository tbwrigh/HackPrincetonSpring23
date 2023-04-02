import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from './recipeCard';


const Day = ({ day, recipeIds, meals }) => {

  const navigation = useNavigation();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dummyState, setDummyState] = useState(false);

    useEffect(() => {
        const updateLoop = setInterval(() => {setDummyState(!dummyState)}, 2000);
    }, []);

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

  console.log(day)

  if (meals) {
    meals = [...new Set(meals)]
    // console.log(meals)
    let m = []
    for (let meal in meals) {
        m.push(JSON.parse(meals[meal]));
    }
    meals = m;
    // console.log(m)
  }
    return (
        <View style={styles.container}>
            <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
          <TouchableOpacity onPress={() => handleRecipeSelect(day)}>
            <Text style={styles.buttonText}>Add Recipe</Text>
          </TouchableOpacity>
        </View>
    
        <View happy={{dummyState}}>
        <ScrollView style={styles.recipeContainer}>
          {meals && meals.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} style={styles.recipecard} />
          ))}
    
            </ScrollView>
        </View>
          
        </View>
      );
    
};

const Calendar = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let [recipeIds, setRecipeIds] = useState("");
  let [dayRecipe, setDayRecipe] = useState({});
  let [dummyState, setDummyState] = useState(false);

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

        async function recipeCards() {
            let dr = await AsyncStorage.getItem('dayRecipe');
            if (dr != null) {
                dayRecipe = JSON.parse(dr);
                // console.log(dayRecipe);
                setDayRecipe(dayRecipe);
            }
        }

        getRecipes();
        getDayRecipe();
        recipeCards();
        const updateLoop = setInterval(() => {setDummyState(!dummyState)}, 5000)

    }, []);


    recipeIds = recipeIds.split(";");
    // console.log(recipeIds)




  return (
    
    <View style={styles.cont}>
      {days.map((day, index) => (
        <Day key={day} day={day} recipeIds={recipeIds} meals={dayRecipe[day]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 20,
    width: '100%',
  },
  cont: {
    flex: 5,
    justifyContent: 'center',
    marginTop: 2,
    width: '100%',
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayText: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 7,
  },
  recipecard: {
    width: '125%',
    marginRight: 50,
    },
});

export default Calendar;
