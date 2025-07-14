// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4s6V4WLH-Hkb1k9_svW9ejUmA0z8D_T4",
    authDomain: "eva-cuatro.firebaseapp.com",
    projectId: "eva-cuatro",
    storageBucket: "eva-cuatro.firebasestorage.app",
    messagingSenderId: "125665804087",
    appId: "1:125665804087:web:7ddd249e31c155821024b2",
    measurementId: "G-4DENDMWR32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
