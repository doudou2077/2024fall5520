import { addDoc, collection, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "./FirebaseSetup";


export async function writeToDB(data, collectionPath) {
    try {
        const collectionRef = collection(database, collectionPath);
        const docRef = await addDoc(collectionRef, data);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;  // Return the ID for potential future use
    } catch (err) {
        console.error('Error writing to db:', err);
        throw err;  // Rethrow the error for handling in the component
    }
}


export async function deleteFromDB(id, collectionName = 'goals') {
    try {
        await deleteDoc(doc(database, collectionName, id));
        console.log('Document deleted with ID: ', id);
    }
    catch (err) {
        console.log(err)
    }
}


export async function deleteAllFromDB(collectionName = 'goals') {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log('All documents deleted from collection:', collectionName);
    } catch (error) {
        console.error('Error deleting all documents:', error);
        throw error;
    }
}

export async function updateWarningStatus(id, collectionName = 'goals', warningStatus) {
    try {
        const docRef = doc(database, collectionName, id);
        await updateDoc(docRef, { warning: warningStatus });
        console.log('Warning status:', warningStatus);
    } catch (err) {
        console.error('Error updating document', err);
    }
}


export async function readAllDocs(collectionPath) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionPath));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error('Error reading documents:', err);
        throw err;
    }
}
