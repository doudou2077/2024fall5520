import React from 'react';
import { StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: 'lightsteelblue',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Goal Tracker',
          }}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goal && route.params.goal.text,
            headerBackTitle: 'Back',
            headerRight: () => (
              <Button
                onPress={() => {
                  console.log('This is a button!');
                }}
                title="Action"
                color="#000"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;