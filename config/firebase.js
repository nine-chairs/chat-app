import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyArCA7cNE742jNkZAugzbZVvG4YEvfvTNI",
    authDomain: "chat-app-f3713.firebaseapp.com",
    projectId: "chat-app-f3713",
    storageBucket: "chat-app-f3713.appspot.com",
    messagingSenderId: "1062700050774",
    appId: "1:1062700050774:web:87ad7e39a8fd44f6740ef7",
    measurementId: "G-5372R2BD95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service (db)
export const db = getFirestore(app);

// Get a reference to the Firebase auth object
export const auth = getAuth();