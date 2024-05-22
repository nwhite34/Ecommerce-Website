// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEnS-q195KbDlha41lVCZ-e54TgNLRpV0",
  authDomain: "ecom-1001a.firebaseapp.com",
  projectId: "ecom-1001a",
  storageBucket: "ecom-1001a.appspot.com",
  messagingSenderId: "59567538058",
  appId: "1:59567538058:web:e7edd490ddcba70e7bd273",
  measurementId: "G-KZ77YGZ3ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
