import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import PressableButton from './PressableButton';

export default function Map({ route, navigation }) {
    const { latitude, longitude } = route.params || {};
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude || 37.78825,
                    longitude: longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title="Selected Location"
                    />
                )}
            </MapView>

            <View style={styles.buttonContainer}>
                <PressableButton
                    onPress={() => {
                        navigation.navigate('Profile', {
                            selectedLocation: selectedLocation
                        });
                    }}
                    style={[
                        styles.button,
                        !selectedLocation && styles.buttonDisabled
                    ]}
                    pressedStyle={styles.buttonPressed}
                    textStyle={styles.buttonText}
                    disabled={!selectedLocation}
                >
                    CONFIRM LOCATION
                </PressableButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonPressed: {
        backgroundColor: '#1976D2',
        opacity: 0.8,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    }
});