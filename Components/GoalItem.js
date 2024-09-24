import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = ({ goal, handleDelete }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{goal.text}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleDelete(goal.id)}>
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
        </View>
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
});

export default GoalItem;
