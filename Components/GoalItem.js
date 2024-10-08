import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const GoalItem = ({ goal, handleDelete, navigation }) => {

    const RippleConfig = {
        color: 'lightblue',
        borderless: false,
    }
    const handleGoalDetails = () => {
        navigation.navigate('GoalDetails', { goal });
    }
    return (
        <View style={styles.textContainer}>
            <Pressable
                onPress={handleGoalDetails}
                android_ripple={RippleConfig}
                style={({ pressed }) => [
                    styles.horizontal,
                    pressed && styles.pressedItem
                ]}
            >
                <Text style={styles.textStyle}>{goal.text}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => handleDelete(goal.id)}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
            </Pressable>
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
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressedItem: {
        opacity: 0.5,
        backgroundColor: '#ccc',
        borderColor: '#000',
    }
});

export default GoalItem;
