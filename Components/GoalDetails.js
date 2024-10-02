import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
    const { goal } = route.params;
    const [isWarning, setIsWarning] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isWarning
                ? 'Warning!'
                : (route.params.moreDetails
                    ? (route.params.goalText || 'More Details')
                    : (goal && goal.text ? goal.text : 'Goal Details')),
            headerRight: () => (
                <Button
                    onPress={() => setIsWarning(!isWarning)}
                    title="Warning"
                    color="#000"
                />
            ),
        });
    }, [navigation, isWarning, goal, route.params]);

    const handleMoreDetails = () => {
        navigation.push('GoalDetails', {
            moreDetails: "More Details",
            goalText: goal.text
        });
    };

    if (route.params.moreDetails) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, isWarning && styles.warningText]}>{route.params.moreDetails}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, isWarning && styles.warningText]}>Goal Details</Text>
            <Text style={[styles.goalText, isWarning && styles.warningText]}>Goal: {goal.text}</Text>
            <Text style={[styles.goalId, isWarning && styles.warningText]}>Goal ID: {goal.id}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="More Details"
                    onPress={handleMoreDetails}
                />
            </View>
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
        marginBottom: 10,
    },
    goalId: {
        fontSize: 16,
        color: 'gray',
    },
    buttonContainer: {
        marginTop: 20,
    },
    warningText: {
        color: 'red',
    },
});

export default GoalDetails;