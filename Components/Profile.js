import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React from 'react'
import { auth } from '../Firebase/FirebaseSetup'
import LocationManager from './LocationManager';
import NotificationManager from './NotificationManager';

export default function Profile({ navigation }) {
    const currentUser = auth.currentUser;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
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
                <NotificationManager />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        padding: 20,
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