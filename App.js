import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, StatusBar, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';

export default function App() {
  const appName = "My App";
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (text) => {
    setInputText(text);
    console.log("App.js:", text);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <StatusBar style="auto" />
        <Header name={appName} />
        <Button
          title="Add a Goal"
          onPress={() => setIsModalVisible(true)}
          style={styles.button}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textStyle}>{inputText}</Text>
      </View>
      <Input
        shouldFocus={true}
        onDataConfirm={handleInputData}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 20,
    color: 'violet',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#dcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '30%',
    margin: 10,
  },
});
