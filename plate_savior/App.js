import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedPage from './pages/getStarted';
import MainPage from './pages/mainPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GetStarted"
          component={GetStartedPage}
          options={{ title: 'Get Started' }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ title: 'Main Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
