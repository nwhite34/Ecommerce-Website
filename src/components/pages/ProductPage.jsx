import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct(productSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.price}</p>
      {/* Add other product details as needed */}
    </div>
  );
}

export default ProductPage;
