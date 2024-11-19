import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
    const verifyPermission = async () => {
        const permissionStatus = await Notifications.getPermissionsAsync();
        if (permissionStatus.granted) {
            return true;
        }

        const response = await Notifications.requestPermissionsAsync();
        return response.granted;
    }
    const handleSetReminder = async () => {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("Need permission")
                return;
            }
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Reminder!",
                    body: "This is your scheduled notification",
                    data: { data: 'goes here' },
                },
                trigger: {
                    seconds: 3,
                },
            });
            console.log('Notification scheduled:', notificationId);
        } catch (error) {
            console.log('Error scheduling notification:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification</Text>
            <Button
                title="Set Reminder"
                onPress={handleSetReminder}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginTop: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

})