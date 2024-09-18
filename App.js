import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Button, StatusBar, SafeAreaView, Alert } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';

export default function App() {
  const appName = "My App";
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => {
    Alert.alert(
      "Confirm Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => setIsModalVisible(false) }
      ]
    );
  }, []);

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
        onCancel={closeModal}
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
    color: 'red',
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
