import { useEffect } from 'react';
import addProductsToFirestore from '../services/addProducts';
import { db, auth } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const InitializeWomenProducts = () => {
  useEffect(() => {
    const checkAndAddProducts = async (user) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const products = [
        {
          image: 'https://source.unsplash.com/featured/?women,formal-dress',
          title: 'Formal Dress',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,casual-dress',
          title: 'Casual Dress',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,denim-jacket',
          title: 'Denim Jacket',
          price: 'A$89.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,linen-top',
          title: 'Linen Top',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,skirt',
          title: 'Skirt',
          price: 'A$39.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,jeans',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,joggers',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: 'https://source.unsplash.com/featured/?women,pants',
          title: 'Pants',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
        },
      ];

      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);

        if (snapshot.empty) {
          await addProductsToFirestore(products, 'products');
        } else {
          console.log('Products already added');
        }
      } catch (error) {
        console.error('Error adding products: ', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkAndAddProducts(user);
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default InitializeWomenProducts;
