import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AddRecipes from './addRecipes';
import PlanMeals from './planMeals';
import ShoppingList from './shoppingList';


const Tab = createBottomTabNavigator();

const MainPage = () => {
    const navigation = useNavigation();

    const [saved, setSaved] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
      navigation.setOptions({
        headerLeft: null,
      })}, []);

  return (
    <Tab.Navigator
    key={key}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Add') {
          iconName = 'add-circle';
        } else if (route.name === 'Plan') {
          iconName = 'calendar';
        } else if (route.name === 'List') {
          iconName = 'cart';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerRight: () => (
        <MaterialCommunityIcons 
          name="cog" 
          size={24} 
          color="black" 
          style={{marginRight: 10}} 
          onPress={() => setKey(key + 1)}
        />
      ),
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Add" component={AddRecipes} />
      <Tab.Screen name="Plan" component={PlanMeals} />
      <Tab.Screen name="List" component={ShoppingList} />
    </Tab.Navigator>
  );
};

export default MainPage;
