import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { auth } from '../Firebase/FirebaseSetup'
import LocationManager from './LocationManager';

export default function Profile({ navigation }) {
    const currentUser = auth.currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Information</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>{currentUser?.email}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>User ID:</Text>
                <Text style={styles.info}>{currentUser?.uid}</Text>
            </View>

            <LocationManager navigation={navigation} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    info: {
        fontSize: 18,
        color: '#000',
    }
});