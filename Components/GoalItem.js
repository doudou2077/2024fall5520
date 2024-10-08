import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from './PressableButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const GoalItem = ({ goal, onDelete, navigation }) => {
    const handleGoalDetails = () => {
        navigation.navigate('GoalDetails', { goal });
    }

    const handleDelete = () => {
        onDelete(goal.id);
    }

    return (
        <View style={styles.textContainer}>
            <PressableButton
                onPress={handleGoalDetails}
                style={styles.goalButton}
                pressedStyle={styles.pressedGoalButton}
            >
                <Text style={styles.textStyle}>{goal.text}</Text>
            </PressableButton>
            <PressableButton
                style={styles.deleteButton}
                onPress={handleDelete}
                pressedStyle={styles.pressedDeleteButton}
            >
                <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
            </PressableButton>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#aaa",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    goalButton: {
        flex: 1,
        padding: 10,
    },
    pressedGoalButton: {
        opacity: 0.7,
    },
    textStyle: {
        fontSize: 20,
        color: 'darkmagenta',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    pressedDeleteButton: {
        backgroundColor: 'transparent',
    },
});

export default GoalItem;