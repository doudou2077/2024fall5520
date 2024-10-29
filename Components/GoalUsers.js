import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { writeToDB, readAllDocs } from '../Firebase/FirebaseHelper'

const GoalUsers = ({ goalId }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('Fetching users for goalId:', goalId);
                const collectionPath = `goals/${goalId}/users`;
                console.log('Collection path:', collectionPath);

                const firestoreUsers = await readAllDocs(collectionPath);
                console.log('Firestore users:', firestoreUsers);

                if (firestoreUsers.length > 0) {
                    setUsers(firestoreUsers);
                } else {
                    console.log('No users found, fetching from API');
                    const response = await fetch('https://jsonplaceholder.typicode.com/users')
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('API data:', data);

                    // Write each user to the subcollection
                    for (const user of data) {
                        console.log('Writing user to Firestore:', user);
                        await writeToDB(user, collectionPath);
                    }

                    console.log('All users written to Firestore');
                    setUsers(data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [goalId]);

    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Associated Users:</Text>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No users found</Text>
                }
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userItem: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginVertical: 5,
        borderRadius: 5,
    },
    userName: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    listContainer: {
        flexGrow: 1,
    },
});

export default GoalUsers;