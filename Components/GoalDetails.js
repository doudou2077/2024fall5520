import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalDetails = ({ route }) => {
    const { goalText } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Goal Details</Text>
            <Text style={styles.goalText}>{goalText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    goalText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default GoalDetails;