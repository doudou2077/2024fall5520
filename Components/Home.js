import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList, Text, Alert, Platform } from 'react-native';
import PressableButton from './PressableButton';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { database } from '../Firebase/FirebaseSetup';
import { writeToDB, deleteFromDB, deleteAllFromDB } from '../Firebase/FirebaseHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { storage } from '../Firebase/FirebaseSetup';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


export default function Home({ navigation }) {
    const appName = "My App";
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [goals, setGoals] = useState([]);
    const [pushToken, setPushToken] = useState(null);

    const auth = getAuth();


    useEffect(() => {
        console.log('Setting up Firestore listener');

        // Check authentication
        if (!auth.currentUser) {
            console.log('No authenticated user');
            navigation.replace('Login');
            return;
        }

        // Query only user's own goals
        const q = query(
            collection(database, 'goals'),
            where("owner", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                let newArray = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((docSnapshot) => {
                        newArray.push({
                            ...docSnapshot.data(),
                            id: docSnapshot.id
                        });
                    });
                }
                setGoals(newArray);
            },
            (error) => {
                console.error("Error listening to goals collection:", error);
                if (error.code === 'permission-denied') {
                    Alert.alert('Error', 'You do not have permission to access these goals');
                }
            }
        );

        return () => unsubscribe();
    }, [auth.currentUser]);

    async function registerForPushNotifications() {
        try {
            // 1. Check for Android
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                });
            }

            // 2. Get permission
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Failed to get push token for push notification!');
                    return;
                }
            }

            // 3. Get push token
            const tokenData = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });

            setPushToken(tokenData.data);  // Save token to state
            console.log('Push token:', tokenData.data);

        } catch (error) {
            console.error('Error getting push token:', error);
        }
    }

    useEffect(() => {
        registerForPushNotifications();
    }, []);

    const sendPushNotification = async () => {
        try {
            if (!pushToken) {
                Alert.alert('Error', 'Push token not available');
                return;
            }

            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: pushToken,
                    title: "Push Notification",
                    body: "This is a push notification",
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send push notification');
            }

            Alert.alert('Success', 'Push notification sent!');
        } catch (error) {
            console.error('Error sending push notification:', error);
            Alert.alert('Error', 'Failed to send push notification');
        }
    };



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

    async function handleInputData(data) {
        try {
            let imageUri = null;
            console.log('handleInputData started with:', data);

            if (data.imageUri) {
                try {
                    console.log('Starting upload process...');

                    // 1. Fetch and verify blob
                    const response = await fetch(data.imageUri);
                    const blob = await response.blob();
                    console.log('Blob details:', {
                        size: blob.size,
                        type: blob.type
                    });

                    // 2. Verify storage reference
                    const imageName = data.imageUri.substring(data.imageUri.lastIndexOf('/') + 1);
                    const imageRef = ref(storage, `images/${imageName}`);
                    console.log('Storage reference details:', {
                        bucket: imageRef.bucket,
                        fullPath: imageRef.fullPath,
                        name: imageRef.name
                    });

                    // 3. Try upload with explicit error handling
                    console.log('Starting upload...');
                    const uploadTask = uploadBytesResumable(imageRef, blob);

                    // Add upload monitoring
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload progress:', progress + '%');
                        },
                        (error) => {
                            console.error('Upload task error:', {
                                code: error.code,
                                message: error.message,
                                serverResponse: error.serverResponse,
                                name: error.name
                            });
                        }
                    );

                    const uploadResult = await uploadTask;
                    console.log('Upload successful:', uploadResult);

                    imageUri = await getDownloadURL(uploadResult.ref);
                    console.log('Got download URL');

                    blob.close();
                } catch (error) {
                    console.error('Upload error details:', {
                        code: error.code,
                        message: error.message,
                        serverResponse: error.serverResponse,
                        name: error.name,
                        stack: error.stack
                    });
                    Alert.alert('Upload Error', error.message);
                    return;
                }
            }

            const newGoal = {
                text: data.text,
                imageUri: imageUri,
                createdAt: new Date().toISOString(),
                owner: auth.currentUser.uid
            };
            console.log('Saving goal:', newGoal);

            await writeToDB(newGoal, "goals");
            console.log('Goal saved successfully');
            setIsModalVisible(false);

        } catch (error) {
            console.error('handleInputData error:', error);
            Alert.alert('Error', 'Failed to save goal. Please try again.');
        }
    }

    const renderItem = ({ item, separators }) => (
        <GoalItem
            goal={item}
            onDelete={handleDelete}
            navigation={navigation}
            onPressIn={() => {
                console.log('onPressIn called for item:', item.id);
                separators.highlight();
            }}
            onPressOut={() => {
                console.log('onPressOut called for item:', item.id);
                separators.unhighlight();
            }}
        />
    );


    const ItemSeparator = ({ highlighted }) => {
        console.log('Separator highlighted:', highlighted);
        return (
            <View style={[
                styles.separator,
                highlighted && styles.highlightedSeparator
            ]} />
        );
    };



    const handleDelete = async (goalId) => {
        try {
            await deleteFromDB(goalId, "goals");
            console.log("Goal deleted successfully with ID:", goalId);
        } catch (error) {
            console.error("Error deleting goal:", error);
            Alert.alert("Error", "Failed to delete goal. Please try again.");
        }
    };

    const EmptyListComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No goals to show</Text>
        </View>
    );

    const ListHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>My Goals</Text>
        </View>
    );

    const handleDeleteAll = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete all goals?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteAllFromDB('goals');
                            console.log("All goals deleted successfully");

                        } catch (error) {
                            console.error("Error deleting all goals:", error);
                            Alert.alert("Error", "Failed to delete all goals. Please try again.");
                        }
                    }
                }
            ]
        );
    };

    const ListFooter = ({ onPressDeleteAll }) => (
        <View style={styles.footerContainer}>
            <Button
                title="Delete All"
                onPress={onPressDeleteAll}
                color="blue"
            />
        </View>
    );

    return (
        <>
            <View style={styles.topContainer}>
                <Header name={appName} />
                <PressableButton
                    onPress={() => setIsModalVisible(true)}
                    style={styles.button}
                    textStyle={styles.buttonText}
                >
                    Add a Goal
                </PressableButton>
                <Button
                    title="Send Push Notification"
                    onPress={sendPushNotification}
                />
            </View>

            <View style={styles.bottomContainer}>
                <FlatList
                // ... existing FlatList props ...
                />
            </View>

            <Input
                shouldFocus={true}
                onDataConfirm={handleInputData}
                isModalVisible={isModalVisible}
                onCancel={closeModal}
            />
        </>
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
        padding: 5,
        borderRadius: 5,
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
        width: '100%',
    },
    button: {
        width: '30%',
        margin: 10,
        backgroundColor: '#333333',
        borderRadius: 10
    },
    goalItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#e9ecef',
    },
    goalText: {
        fontSize: 16,
    },
    listContainerStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingVertical: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 20,
        color: 'gray',
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        padding: 5,
    },
    footerContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        height: 2,
        width: '100%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    highlightedSeparator: {
        height: 2,
        width: '100%',
        borderWidth: 2,
        borderColor: 'red',
    },

});
