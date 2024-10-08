import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PressableButton from './PressableButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const GoalItem = ({ goal, handleDelete, navigation }) => {

    const RippleConfig = {
        color: 'Red',
        borderless: false,
        radius: 1000,
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
                <PressableButton
                    Component style={styles.deleteButton}
                    Pressed handler={handleDelete}
                    Pressdstyle={styles.pressedStyle} >
                    <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
                </PressableButton>
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
        backgroundColor: 'lightblue',
        borderColor: '#000',
    },

    goalItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 5,
    },
    goalText: {
        fontSize: 16,
        backgroundColor: '#d3d3d3',
    },
});

export default GoalItem;
