import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore'; 

const saveUserData = async (userData) => {
  try {
    await addDoc(collection(db, 'users'), userData);
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
  }
};

export default saveUserData;
