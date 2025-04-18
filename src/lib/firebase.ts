// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "react-chat-app-be71c.firebaseapp.com",
  projectId: "react-chat-app-be71c",
  storageBucket: "react-chat-app-be71c.firebasestorage.app",
  messagingSenderId: "502260995769",
  appId: "1:502260995769:web:ce9a242cecb04ad8d3ed68",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
