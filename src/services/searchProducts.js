import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

const searchProducts = async (searchValue) => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);

    const allProducts = snapshot.docs.map(doc => doc.data());
    console.log('All products:', allProducts); // Debug log

    const filteredProducts = allProducts.filter(product => {
      // Ensure product has a title before attempting to call toLowerCase
      return product.title && product.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    return filteredProducts;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export default searchProducts;
