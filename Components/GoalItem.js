import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const GoalItem = ({ goal, handleDelete, navigation }) => {

    const handleGoalDetails = () => {
        navigation.navigate('GoalDetails', { goal });
    }
    return (
        <Pressable
            onPress={handleGoalDetails}
            android_ripple={{ color: '#cccccc' }}
            style={({ pressed }) => [
                styles.textContainer,
                pressed && styles.pressedItem
            ]}
        >
            <Text style={styles.textStyle}>{goal.text}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleDelete(goal.id)}>
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton} onPress={handleGoalDetails}>
                <Text style={styles.infoButtonText}>i</Text>
            </TouchableOpacity>

        </Pressable>
    );
};


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: 'darkmagenta',
    },
    textContainer: {
        flexDirection: 'row',
        backgroundColor: "#aaa",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    infoButton: {
        marginLeft: 10,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default GoalItem;
