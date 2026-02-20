import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCvxJPxLgmMvMW0DJpy44C5p2ACbLqf1E",
    authDomain: "dragon-swim.firebaseapp.com",
    projectId: "dragon-swim",
    storageBucket: "dragon-swim.firebasestorage.app",
    messagingSenderId: "353938946053",
    appId: "1:353938946053:web:1fbdf6b4a508392e6b046c",
    measurementId: "G-TK7P3RYXF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export {
    auth,
    db,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    googleProvider,
    onAuthStateChanged,
    signOut,
    updateProfile,
    doc,
    setDoc,
    getDoc
};
