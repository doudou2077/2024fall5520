import { View, Text } from 'react-native'
import React from 'react'

export default function Header({ name }) {
    return (
        <View style={
            {
                padding: 20,
                backgroundColor: 'rgba(0,0,0,0.1)',
                alignItems: 'center',
                borderRadius: 5,
            }
        }>
            <Text style={
                {
                    fontSize: 15,
                    color: 'black',
                    padding: 0.3,
                    borderRadius: 5,
                    fontWeight: 'bold',
                }}>
                Welcome to {name}
            </Text>
        </View>
    )
}