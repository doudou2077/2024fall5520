import { addDoc, collection, doc, deleteDoc, getDocs, updateDoc, query, where, setDoc, getDoc } from "firebase/firestore";
import { database } from "./FirebaseSetup";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export async function writeToDB(data, collectionPath) {
    try {
        // Check authentication
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        // Add owner field to the data
        const dataWithOwner = {
            ...data,
            owner: auth.currentUser.uid  // Add this line
        };

        const collectionRef = collection(database, collectionPath);
        const docRef = await addDoc(collectionRef, dataWithOwner);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (err) {
        console.error('Error writing to db:', err);
        throw err;
    }
}


export async function deleteFromDB(id, collectionName = 'goals') {
    try {
        // Check authentication
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        await deleteDoc(doc(database, collectionName, id));
        console.log('Document deleted with ID: ', id);
    } catch (err) {
        console.error('Error deleting document:', err);
        throw err;  // Throw error for proper handling
    }
}



export async function deleteAllFromDB(collectionName = 'goals') {
    try {
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        const q = query(
            collection(database, collectionName),
            where("owner", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log('All user documents deleted from collection:', collectionName);
    } catch (error) {
        console.error('Error deleting documents:', error);
        throw error;
    }
}

export async function updateWarningStatus(id, collectionName = 'goals', warningStatus) {
    try {
        // Check authentication
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        const docRef = doc(database, collectionName, id);
        await updateDoc(docRef, { warning: warningStatus });
        console.log('Warning status:', warningStatus);
    } catch (err) {
        console.error('Error updating document:', err);
        throw err;  // Throw error for proper handling
    }
}


export async function readAllDocs(collectionPath) {
    try {
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        // For goals collection, filter by owner
        if (collectionPath === 'goals') {
            const q = query(
                collection(database, collectionPath),
                where("owner", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        // For other collections, just check authentication (as per rules)
        const querySnapshot = await getDocs(collection(database, collectionPath));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error('Error reading documents:', err);
        throw err;
    }
}


export async function saveUserLocation(location) {
    try {
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        const userDocRef = doc(database, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, {
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                updatedAt: new Date().toISOString()
            }
        }, { merge: true });  // This will update the location without overwriting other user data

        console.log('Location saved successfully');
    } catch (error) {
        console.error('Error saving location:', error);
        throw error;
    }
}



export async function getUserLocation() {
    try {
        if (!auth.currentUser) {
            throw new Error('User must be authenticated');
        }

        const userDocRef = doc(database, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.location;
        } else {
            console.log('No location found for user');
            return null;
        }
    } catch (error) {
        console.error('Error getting user location:', error);
        throw error;
    }
}