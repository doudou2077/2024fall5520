import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Button, StatusBar, SafeAreaView, Alert, FlatList, Text } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import GoalItem from './Components/GoalItem';

export default function App() {
  const appName = "My App";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

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
    // setInputText(text);
    // add a new object
    const newGoal = {
      id: Math.floor(Math.random() * 10000).toString(),
      text: text,
    };
    setGoals(currentGoals => [...currentGoals, newGoal]);
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <GoalItem
      goal={item}
      handleDelete={handleDelete}
    />
  );

  // The delete function
  const handleDelete = (goalId) => {
    console.log("Deleting goal with id:", goalId);
    setGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId));
  }

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
        <FlatList
          data={goals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainerStyle}
          ListEmptyComponent={EmptyListComponent}
          ListHeaderComponent={goals.length > 0 ? ListHeader : null}
        />
        {/* <ScrollView>
          {goals.map((goal) => (
            console.log(goal),
            <View key={goal.id} style={styles.goalItemContainer}>
              <Text style={styles.goalText}>{goal.text}</Text>
            </View>
          ))}
        </ScrollView> */}
      </View>
      {/* <View style={styles.bottomContainer}>
        <Text style={styles.textStyle}>{inputText}</Text>
      </View> */}

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
    width: '60%',
    margin: 10,
  },
  goalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    width: '90%',
    alignSelf: 'center',
  },
  goalText: {
    fontSize: 16,
  },
  listContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    backgroundColor: '#f8f9fa'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40'
  },
});
