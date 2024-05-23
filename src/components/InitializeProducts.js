// src/components/InitializeProducts.js
import { useEffect } from 'react';
import addProductsToFirestore from '../services/addProducts';
import { db, auth } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const InitializeProducts = () => {
  useEffect(() => {
    const checkAndAddProducts = async (user) => {
      const products = [
        {
          image: 'https://source.unsplash.com/featured/?men,formal-shirt',
          title: 'Formal Shirt',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,casual-shirt',
          title: 'Casual Shirt',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,denim-shirt',
          title: 'Denim Shirt',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,linen-shirt',
          title: 'Linen Shirt',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,chinos',
          title: 'Chinos',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,jeans',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,joggers',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?men,dress-pants',
          title: 'Dress Pants',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
        },
      ];

      if (user) {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);

        if (snapshot.empty) {
          await addProductsToFirestore(products, 'products');
        } else {
          console.log('Products already added');
        }
      } else {
        console.error('User not authenticated');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAndAddProducts(user);
      } else {
        console.error('User not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default InitializeProducts;
