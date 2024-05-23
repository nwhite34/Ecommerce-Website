// src/services/searchProducts.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const searchProducts = async (searchTerm) => {
  const productsRef = collection(db, 'products');
  const q = query(
    productsRef,
    where('title', '>=', searchTerm),
    where('title', '<=', searchTerm + '\uf8ff')
  );
  
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  
  return products;
};

export default searchProducts;
