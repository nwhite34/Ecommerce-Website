// src/services/auth.js
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Function to capitalize the first letter of the name
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Sign up function
export const signUpUser = async (email, password, name) => {
  try {
    const capitalizedDisplayName = capitalizeFirstLetter(name);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: capitalizedDisplayName
    });
    console.log('User signed up:', userCredential.user);
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

// Sign in function
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};
