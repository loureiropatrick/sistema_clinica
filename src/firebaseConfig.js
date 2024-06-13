import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB29ilYX138LLrwI84HsHQkoO8GJD05WeU",
    authDomain: "maissaude-c3ca5.firebaseapp.com",
    databaseURL: "https://maissaude-c3ca5-default-rtdb.firebaseio.com",
    projectId: "maissaude-c3ca5",
    storageBucket: "maissaude-c3ca5.appspot.com",
    messagingSenderId: "761845635969",
    appId: "1:761845635969:web:3037dedfd292b3e03aa680",
    measurementId: "G-7Y497D3HG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log('Firebase initialized:', app);

export { db };
