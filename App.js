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
import Map from './Components/Map';
import * as Notifications from 'expo-notifications';

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
      name="GoalDetails"  // Changed from "Details" to "GoalDetails"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params?.goal?.text || 'Goal Details',
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

    <Stack.Screen
      name="Map"
      component={Map}
      options={{
        title: 'Location Map',
      }}
    />

  </>
);


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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


  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // This function runs when a notification is received while app is running
        console.log('Notification received:', notification);
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body
        );
      }
    );

    // Cleanup function to remove the listener when component unmounts
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // This runs when user taps on the notification
        console.log('Notification tapped:', response);

        // Access the custom data passed with the notification
        const userData = response.notification.request.content.data;
        console.log('Custom data:', userData);

        // You can navigate or perform actions based on the notification
        Alert.alert(
          'Notification Tapped',
          'You responded to the notification!'
        );
      }
    );

    return () => subscription.remove();
  }, []);


  if (loading) {
    return null;
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