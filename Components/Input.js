import { TextInput } from 'react-native';
import React, { useState } from 'react';

export default function Input() {
    const [text, setText] = useState("");
    return (
        <TextInput
            placeholder="Type here"
            autoCorrect={true}
            keyboardType='default'
            value={text}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(changedText) => {
                console.log(changedText);
                setText(changedText);
            }}
        />
    );
}
