import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
