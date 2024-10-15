import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList, Text, Alert } from 'react-native';
import PressableButton from './PressableButton';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { database } from '../Firebase/FirebaseSetup';
import { writeToDB, deleteFromDB, deleteAllFromDB } from '../Firebase/FirebaseHelper';
import { collection, onSnapshot } from 'firebase/firestore';


export default function Home({ navigation }) {
    console.log(database);
    const appName = "My App";
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'goals'),
            (querySnapshot) => {
                let newArray = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((docSnapshot) => {
                        newArray.push({
                            ...docSnapshot.data(),// Spread all fields from the document
                            id: docSnapshot.id // Add the id as a separate field
                        });
                    });
                }
                setGoals(newArray);
            },
            (error) => {
                console.error("Error listening to goals collection:", error);
            }
        );

        return () => unsubscribe();
    }, []);

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

    async function handleInputData(text) {
        const newGoal = { text: text };
        try {
            await writeToDB(newGoal, "goals");
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error adding goal:", error);
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
            </View>

            <View style={styles.bottomContainer}>
                <FlatList
                    data={goals}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainerStyle}
                    ListEmptyComponent={EmptyListComponent}
                    ListHeaderComponent={goals.length > 0 ? ListHeader : null}
                    ListFooterComponent={goals.length > 0 ? <ListFooter onPressDeleteAll={handleDeleteAll} /> : null}
                    ItemSeparatorComponent={({ highlighted }) => (
                        <ItemSeparator highlighted={highlighted} />
                    )}
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
