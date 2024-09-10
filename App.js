import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState("");
  const appName = "My App";
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <TextInput
        // placeholder ="Type here"
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={function (changeText) {
          console.log(changedText);
          setText(changeText);
        }
        }
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
