import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './Firebase/FirebaseSetup';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';

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

// Define AuthStack separately
const AuthStack = (
  <>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        title: 'Signup',
        headerBackVisible: false,
      }}
    />
  </>
);

// Define AppStack separately
const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'Goal Tracker',
        headerBackVisible: false,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params.goal && route.params.goal.text,
        headerBackTitle: 'Back',
      })}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'My Profile',
        headerRight: () => (
          <TouchableOpacity
            onPress={async () => {
              try {
                await signOut(auth);
              } catch (error) {
                console.error('Logout error:', error);
                Alert.alert('Error', 'Failed to sign out');
              }
            }}
            style={{ marginRight: 15 }}
          >
            <Octicons name="sign-out" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={commonHeaderOptions}>
        {user ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;