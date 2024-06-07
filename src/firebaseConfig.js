// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB29ilYX138LLrwI84HsHQkoO8GJD05WeU",
  authDomain: "maissaude-c3ca5.firebaseapp.com",
  projectId: "maissaude-c3ca5",
  storageBucket: "maissaude-c3ca5.appspot.com",
  messagingSenderId: "761845635969",
  appId: "1:761845635969:web:3037dedfd292b3e03aa680",
  measurementId: "G-7Y497D3HG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};