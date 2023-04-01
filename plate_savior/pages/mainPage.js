import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddRecipes from './addRecipes';
import PlanMeals from './planMeals';
import ShoppingList from './shoppingList';


const Tab = createBottomTabNavigator();

const MainPage = () => {
    const navigation = useNavigation();

    useEffect(() => {navigation.setOptions({
        headerLeft: null,
      })}, []);

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Add') {
          iconName = 'add-circle';
        } else if (route.name === 'Plan') {
          iconName = 'calendar';
        } else if (route.name === 'Shop') {
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
          onPress={() => navigation.navigate('Settings')}
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
      <Tab.Screen name="Shop" component={ShoppingList} />
    </Tab.Navigator>
  );
};

export default MainPage;