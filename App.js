import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My App' }}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={{ title: 'Goal Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;