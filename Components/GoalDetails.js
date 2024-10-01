import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
    const { goal } = route.params;
    const handleMoreDetails = () => {
        navigation.push('GoalDetails', { moreDetails: "More Details" });
    };

    if (route.params.moreDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.moreDetails}</Text>
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Goal Details</Text>
            <Text style={styles.goalText}>Goal: {goal.text}</Text>
            <Text style={styles.goalId}>Goal ID: {goal.id}</Text>
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
});

export default GoalDetails;