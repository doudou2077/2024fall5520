import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { writeToDB, readAllDocs } from '../Firebase/FirebaseHelper'

const GoalUsers = ({ goalId }) => {
    const [users, setUsers] = useState([]);

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
                setUsers([{ id: 'error', name: `Error: ${error.message}` }]);
            }
        };

        fetchUsers();
    }, [goalId]);

    const renderItem = ({ item }) => (
        <Text>{item.name}</Text>
    )

    return (
        <View>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default GoalUsers