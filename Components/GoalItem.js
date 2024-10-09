import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PressableButton from './PressableButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const GoalItem = ({ goal, onDelete, navigation, onPressIn, onPressOut }) => {
    const handleGoalDetails = () => {
        navigation.navigate('GoalDetails', { goal });
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Goal",
            "Are you sure you want to delete this goal?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => onDelete(goal.id), style: "destructive" }
            ]
        );
    }

    return (
        <PressableButton
            onPress={handleGoalDetails}
            onLongPress={handleDelete}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.textContainer}
            pressedStyle={styles.pressedGoalButton}
        >
            <Text style={styles.textStyle}>{goal.text}</Text>
            <PressableButton
                style={styles.deleteButton}
                onPress={handleDelete}
                pressedStyle={styles.pressedDeleteButton}
            >
                <MaterialCommunityIcons name="delete-outline" size={20} color="white" />
            </PressableButton>
        </PressableButton>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#aaa",
        padding: 5,
        marginVertical: 5,
        borderRadius: 5,
    },
    pressedGoalButton: {
        opacity: 0.7,
    },
    textStyle: {
        flex: 1,
        fontSize: 16,
        color: 'darkmagenta',
        padding: 5,
    },
    deleteButton: {
        padding: 3,
        borderRadius: 3,
        marginLeft: 5,
    },
    pressedDeleteButton: {
        backgroundColor: 'red',
    },
});

export default GoalItem;