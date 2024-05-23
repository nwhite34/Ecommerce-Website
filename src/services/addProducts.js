// src/services/addProducts.js
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const addProductsToFirestore = async (products, collectionName) => {
  const productsRef = collection(db, collectionName);

  try {
    await Promise.all(products.map(async (product) => {
      await addDoc(productsRef, product);
    }));
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products: ', error);
  }
};

export default addProductsToFirestore;
