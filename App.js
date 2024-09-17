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
        <Text>Children</Text>
        <Button
          title="Add a Goal"
          onPress={() => setIsModalVisible(true)}
        />
        <Input
          shouldFocus={true}
          onDataConfirm={handleInputData}
          isModalVisible={isModalVisible}
        />
      </View>
      <Text style={styles.textStyle}>{inputText}</Text>
      <View style={styles.bottomContainer}>
        {/* Additional components or features can go here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'violet',
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#dcd',
    alignItems: 'center',
  },
});
