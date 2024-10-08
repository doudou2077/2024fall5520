import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function PressableButton({ children, onPress, style, textStyle }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) =>
                [styles.button, style, pressed && styles.pressed]
            }>
            <View>
                <Text style={[styles.text, textStyle]}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
});