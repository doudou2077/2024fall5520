import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { database } from "./FirebaseSetup";


export async function writeToDB(data, collectionName = 'goals') {
    try {
        const docId = await addDoc(collection(database, collectionName), data);
        console.log('Document written with ID: ', docId.id);
    } catch (err) {
        console.error('write to db ', err);
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