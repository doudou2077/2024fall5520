import { View, Button, Platform, Image, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({ onImageTaken }) {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  const verifyPermission = async () => {
    if (permission?.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  const handleCameraPress = async () => {
    try {
      // Check permissions
      if (Platform.OS === 'ios') {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
          Alert.alert('Permission Required', 'You need to enable camera permissions to take photos');
          return;
        }
      }

      // launch camera and get image
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      // If imaged taken, pass URI to input.js
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        onImageTaken(uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleCameraPress} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.preview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  }
});