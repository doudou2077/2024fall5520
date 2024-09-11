import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function Input({ shouldFocus }) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        setIsFocused(false);
    };


    return (
        <View>
            <TextInput
                placeholder="Type here"
                autoCorrect={false}
                keyboardType='default'
                value={text}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
                onChangeText={(changedText) => {
                    console.log(changedText);
                    setText(changedText);
                }}
                autoFocus={shouldFocus}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
            />
            {isFocused && <Text>Characters: {text.length}</Text>}
        </View>
    );
}
