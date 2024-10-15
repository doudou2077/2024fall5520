// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDdxRXsW042qvraa1JFU0wogCdgkAvGPXQ",
    authDomain: "session7-3314a.firebaseapp.com",
    projectId: "session7-3314a",
    storageBucket: "session7-3314a.appspot.com",
    messagingSenderId: "309978806615",
    appId: "1:309978806615:web:0838067ca98eb534142612",
    measurementId: "G-D4MPYV2PDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);