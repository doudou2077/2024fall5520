import React, { useState } from 'react';
import { TextInput, View, Text, Button, Modal, StyleSheet } from 'react-native';

export default function Input({ shouldFocus, onDataConfirm, isModalVisible, onCancel }) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleConfirm = () => {
        console.log("Final text on confirm:", text);
        onDataConfirm(text);
        setText("");
    };

    const handleCancel = () => {
        onCancel();
        setText('');
    };

    const isConfirmEnabled = text.length >= 3;

    return (
        <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.modalBackground}>
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
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleConfirm} disabled={!isConfirmEnabled} />
                        <Button title="Cancel" onPress={handleCancel} color="#FF6347" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        jusrifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});
