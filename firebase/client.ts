// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw1QK_Ws7eyFTiE26CcdnxTN3t1wFkpZU",
  authDomain: "prep-it-4a2f5.firebaseapp.com",
  projectId: "prep-it-4a2f5",
  storageBucket: "prep-it-4a2f5.firebasestorage.app",
  messagingSenderId: "710848449563",
  appId: "1:710848449563:web:3ecf1cbab4419b13b5bcbe",
  measurementId: "G-5250Y54CDR"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)