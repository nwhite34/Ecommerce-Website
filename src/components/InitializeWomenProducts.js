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
          category: 'women',
          brand: 'Zara',
          description: 'A chic formal dress perfect for evening events.',
          material: 'Silk, Polyester',
          careInstructions: 'Dry clean only',
        },
        {
          image: '/images/casualdress.jpg',
          title: 'Casual Dress',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'H&M',
          description: 'A relaxed casual dress ideal for daily wear.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, cold',
        },
        {
          image: '/images/decomjacket.jpg',
          title: 'Denim Jacket',
          price: 'A$89.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'Levi\'s',
          description: 'A stylish denim jacket that adds a cool edge to any outfit.',
          material: 'Denim',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/linentop.jpg',
          title: 'Linen Top',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'Uniqlo',
          description: 'A breezy linen top perfect for summer days.',
          material: 'Linen',
          careInstructions: 'Hand wash, line dry',
        },
        {
          image: '/images/skirt.jpeg',
          title: 'Skirt',
          price: 'A$39.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'Forever 21',
          description: 'A versatile skirt that can be dressed up or down.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, warm',
        },
        {
          image: '/images/jeanswomen.jpg',
          title: 'Jeans',
          price: 'A$69.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'GAP',
          description: 'Classic jeans with a comfortable fit and timeless style.',
          material: 'Denim',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/joggerswomen.jpg',
          title: 'Joggers',
          price: 'A$49.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'Adidas',
          description: 'Comfortable joggers ideal for workouts or casual wear.',
          material: 'Cotton, Polyester',
          careInstructions: 'Machine wash, cold, tumble dry low',
        },
        {
          image: '/images/pants.jpg',
          title: 'Pants',
          price: 'A$59.99',
          sizes: ['S', 'M', 'L'],
          category: 'women',
          brand: 'Nike',
          description: 'Versatile pants that can be dressed up or down for any occasion.',
          material: 'Cotton, Spandex',
          careInstructions: 'Machine wash, warm, tumble dry medium',
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
