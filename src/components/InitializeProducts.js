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
          category: 'men',
          brand: 'Ralph Lauren',
          description: 'A stylish formal shirt perfect for office wear.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, cold',
        },
        {
          image: '/images/casualshirt.jpg',
          title: 'Casual Shirt',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Tommy Hilfiger',
          description: 'A comfortable casual shirt ideal for everyday wear.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, warm',
        },
        {
          image: '/images/denimshirt.jpg',
          title: 'Denim Shirt',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Levi\'s',
          description: 'A rugged denim shirt that combines style with durability.',
          material: 'Denim',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/linenshirt.jpg',
          title: 'Linen Shirt',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Banana Republic',
          description: 'A lightweight linen shirt perfect for warm weather.',
          material: 'Linen',
          careInstructions: 'Hand wash, line dry',
        },
        {
          image: '/images/chinos.jpg',
          title: 'Chinos',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Dockers',
          description: 'Versatile chinos that can be dressed up or down for any occasion.',
          material: 'Cotton, Spandex',
          careInstructions: 'Machine wash, warm, tumble dry medium',
        },
        {
          image: '/images/Jeansmen.jpg',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Wrangler',
          description: 'Classic jeans with a comfortable fit and timeless style.',
          material: 'Denim',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/Joggersmen.jpg',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Nike',
          description: 'Comfortable joggers ideal for workouts or casual wear.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/dresspants.jpg',
          title: 'Dress Pants',
          price: 'A$79.99',
          sizes: ['S', 'M', 'L'],
          category: 'men',
          brand: 'Hugo Boss',
          description: 'Elegant dress pants suitable for formal occasions.',
          material: 'Polyester, Rayon',
          careInstructions: 'Dry clean only',
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
