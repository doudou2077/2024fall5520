import { View, Alert, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import PressableButton from './PressableButton'
import { saveUserLocation, getUserLocation } from '../Firebase/FirebaseHelper'

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function LocationManager({ navigation, route }) {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const getStaticMapUrl = () => {
        if (!location.latitude || !location.longitude) return null;

        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
        console.log('API Key being used:', GOOGLE_MAPS_API_KEY);
        console.log('Map URL:', url);
        return url;
    }

    const verifyPermission = async () => {
        if (response?.granted) {
            return true;
        }

        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    }

    const getLocation = async () => {
        try {
            setIsLoading(true);
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
                return;
            }

            // Get current position
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            Alert.alert(
                'Location Found',
                `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to get location: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (route?.params?.selectedLocation) {
            setLocation({
                latitude: route.params.selectedLocation.latitude,
                longitude: route.params.selectedLocation.longitude
            });
        }
    }, [route?.params?.selectedLocation]);


    const handleSaveLocation = async () => {
        try {
            if (!location.latitude || !location.longitude) {
                Alert.alert('Error', 'Please get or select a location first');
                return;
            }

            await saveUserLocation(location);
            Alert.alert('Success', 'Location saved successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to save location: ' + error.message);
        }
    };
    useEffect(() => {
        const fetchSavedLocation = async () => {
            try {
                const savedLocation = await getUserLocation();
                if (savedLocation) {
                    setLocation({
                        latitude: savedLocation.latitude,
                        longitude: savedLocation.longitude
                    });
                }
            } catch (error) {
                console.error('Error fetching saved location:', error);
                Alert.alert('Error', 'Failed to fetch saved location');
            }
        };

        fetchSavedLocation();
    }, []);



    return (
        <View style={styles.container}>
            <PressableButton
                onPress={getLocation}
                style={styles.button}
                pressedStyle={styles.buttonPressed}
                textStyle={styles.buttonText}
            >
                {isLoading ? "FINDING LOCATION..." : "FIND MY LOCATION"}
            </PressableButton>

            {location.latitude && location.longitude && (
                <>
                    <Image
                        style={styles.map}
                        source={{ uri: getStaticMapUrl() }}
                        onError={(error) => Alert.alert('Error', 'Failed to load map')}
                    />
                    <PressableButton
                        onPress={() => navigation.navigate('Map', {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        })}
                        style={[styles.button, { marginTop: 10 }]}
                        pressedStyle={styles.buttonPressed}
                        textStyle={styles.buttonText}
                    >
                        VIEW INTERACTIVE MAP
                    </PressableButton>
                    <PressableButton
                        onPress={handleSaveLocation}
                        style={[styles.button, { marginTop: 10 }]}
                        pressedStyle={styles.buttonPressed}
                        textStyle={styles.buttonText}
                    >
                        SAVE LOCATION
                    </PressableButton>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        width: '100%',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonPressed: {
        backgroundColor: '#1976D2', // darker shade when pressed
        opacity: 0.8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    map: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    }
});