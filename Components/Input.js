import React, { useState } from 'react';
import { TextInput, View, Text, Button, Modal, StyleSheet, Image } from 'react-native';

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
        <Modal animationType="slide" transparent={true} visible={isModalVisible} >
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

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
                            style={styles.imageStyle}
                            alt="Network image icon"
                        />
                        <Image
                            source={require('../assets/target.png')}
                            style={styles.imageStyle}
                            alt="Local image icon"
                        />
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
    },
    container: {
        backgroundColor: 'grey',
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
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },

    imageContainer: {
        flexDirection: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});
