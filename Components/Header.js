import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

export default function Header({ name }) {
    const { width, height } = useWindowDimensions();

    // Dynamic styles based on screen dimensions
    const dynamicStyles = {
        fontSize: width < 380 ? 20 : 26,
        paddingHorizontal: width < 380 ? 10 : 20,
        paddingVertical: height < 415 ? 5 : 10,
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, dynamicStyles]}>
                Welcome to {name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 12,
        width: '90%',
        maxWidth: 350,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        textAlign: 'center',
    },
});