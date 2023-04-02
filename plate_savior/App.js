import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';

import Main from './pages/mainPage';
import GetStartedPage from './pages/getStarted';
import RecipeDetail from './pages/RecipeDetail';
import SelectRecipe from './pages/selectRecipe';

const Stack = createStackNavigator();

export default function App() {
  
  let route = 'GetStartedPage';

  const [key, setKey] = useState(0);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const isSetupComplete = await AsyncStorage.getItem('isSetupComplete');
      if (isSetupComplete === 'true') {
        // Redirect to Main page if setup is complete
        route = 'Main';
      } else {
        // Redirect to GetStartedPage if setup is not complete
        route = 'GetStartedPage';
      }
    } catch (error) {
      console.log(error);
      // Redirect to GetStartedPage if there is an error
      route = 'GetStartedPage';
    }
  }

  return (
    <NavigationContainer key={key}>
      <Stack.Navigator initialRouteName={route}> 
        <Stack.Screen name="GetStartedPage" component={GetStartedPage} options={{ headerShown: false }} />
        <Stack.Screen key={key} name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={GetStartedPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} initialParams={{ r: {name: "dog"} }}  />
        <Stack.Screen name="SelectRecipe" component={SelectRecipe} initialParams={{rs: {name: "dog"}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

App.navigationOptions = {
  header: null,
};