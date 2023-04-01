import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';

import Main from './pages/mainPage';
import GetStartedPage from './pages/getStarted';
import RecipeDetail from './pages/RecipeDetail';

const Stack = createStackNavigator();

export default function App() {
  let route = 'GetStartedPage';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName={route}> 
        <Stack.Screen name="GetStartedPage" component={GetStartedPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={GetStartedPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} initialParams={{ r: {name: "dog"} }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
