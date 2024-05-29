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
          image: '/images/formadress.jpg',
          title: 'Formal Dress',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/casualdress.jpg',
          title: 'Casual Dress',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/decomjacket.jpg',
          title: 'Denim Jacket',
          price: 'A$89.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/linentop.jpg',
          title: 'Linen Top',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/skirt.jpeg',
          title: 'Skirt',
          price: 'A$39.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/jeanswomen.jpg',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/joggerswomen.jpg',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
        },
        {
          image: '/images/pants.jpg',
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
