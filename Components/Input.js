import React, { useState } from 'react';
import { TextInput, View, Text, Button, Modal, StyleSheet } from 'react-native';

export default function Input({ shouldFocus, onDataConfirm, isModalVisible }) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleConfirm = () => {
        console.log("Final text on confirm:", text);
        onDataConfirm(text);
    };

    return (
        <Modal animationType="slide" visible={isModalVisible}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Type here"
                    autoCorrect={false}
                    keyboardType='default'
                    value={text}
                    style={styles.textInputStyle}
                    onChangeText={setText}
                    autoFocus={shouldFocus}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {isFocused && text.length > 0 && (
                    <Text>
                        {text.length >= 3 ? "Thank you!" : "Please type more than 3 characters"}
                    </Text>
                )}
                <Button title="Confirm" onPress={handleConfirm} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
    },
});
