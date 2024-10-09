import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const PressableButton = ({ children, onPress, style, pressedStyle, textStyle, onPressIn, onPressOut }) => {
    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={({ pressed }) => [
                styles.button,
                style,
                pressed && pressedStyle
            ]}
        >
            {typeof children === 'string' ? (
                <Text style={textStyle}>{children}</Text>
            ) : (
                children
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PressableButton;