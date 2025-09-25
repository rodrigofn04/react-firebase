import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCOhz4izj6yCg37TXOSNVyQcaJKSRhYX70",
  authDomain: "react-firebase-a4e3c.firebaseapp.com",
  projectId: "react-firebase-a4e3c",
  storageBucket: "react-firebase-a4e3c.firebasestorage.app",
  messagingSenderId: "312556206574",
  appId: "1:312556206574:web:6bf8519e385c6a0d1ab6ff",
  measurementId: "G-ZP8RFR8JSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);  
export const db = getFirestore(app);