import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PressableButton from './PressableButton';
import { updateWarningStatus } from '../Firebase/FirebaseHelper';

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
                <PressableButton
                    onPress={handleWarningToggle}
                    style={styles.headerButton}
                    pressedStyle={styles.headerButtonPressed}
                >
                    <Ionicons
                        name={isWarning ? "warning" : "warning-outline"}
                        size={24}
                        color={isWarning ? "red" : "black"}
                    />
                </PressableButton>
            ),
        });
    }, [navigation, isWarning, goal, route.params]);

    const handleWarningToggle = async () => {
        try {
            const newWarningStatus = !isWarning;
            await updateWarningStatus(goal.id, newWarningStatus);
            setIsWarning(newWarningStatus);
        } catch (error) {
            console.error('Error toggling warning status:', error);
            Alert.alert('Error', 'Failed to update warning status. Please try again.');
        }
    }
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
                <PressableButton
                    onPress={handleMoreDetails}
                    style={styles.moreDetailsButton}
                    textStyle={styles.moreDetailsButtonText}
                >
                    More Details
                </PressableButton>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningText: {
        color: 'red',
    },
    headerButton: {
        padding: 10,
    },
    headerButtonPressed: {
        opacity: 0.7,
    },
    moreDetailsButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    moreDetailsButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default GoalDetails;