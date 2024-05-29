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
          image: '/images/formalshirt.jpg',
          title: 'Formal Shirt',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/casualshirt.jpg',
          title: 'Casual Shirt',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/denimshirt.jpg',
          title: 'Denim Shirt',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/linenshirt.jpg',
          title: 'Linen Shirt',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/chinos.jpg',
          title: 'Chinos',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/Jeansmen.jpg',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/Joggersmen.jpg',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/dresspants.jpg',
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
