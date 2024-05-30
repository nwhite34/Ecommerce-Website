import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from '../Navbar';
import Footer from '../Footer';
import PromoBar from '../PromoBar';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const { title } = useParams();
  const productTitle = title.replace(/-/g, ' ');
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const foundProduct = productsData.find(product => product.title.toLowerCase() === productTitle.toLowerCase());

        if (foundProduct) {
          setProduct(foundProduct);
          setIsWishlisted(wishlist.some(item => item.id === foundProduct.id));
          // Filter other products by category
          const otherProductsByCategory = productsData.filter(product => 
            product.title.toLowerCase() !== productTitle.toLowerCase() &&
            product.category === foundProduct.category
          );
          setOtherProducts(otherProductsByCategory);
        } else {
          setError('No such document!');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product');
      }
    };

    fetchProduct();
  }, [productTitle, wishlist]);

  const handleAddToCart = (size) => {
    addToCart({ ...product, size });
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ ...product, id: product.id });
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % otherProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + otherProducts.length) % otherProducts.length);
  };

  const visibleProducts = otherProducts.slice(currentIndex, currentIndex + 7).concat(otherProducts.slice(0, Math.max(0, (currentIndex + 7) - otherProducts.length)));

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <Header />
      <div className="container mx-auto mt-32 pt-20 pb-20">
        <div className="bg-white shadow-md rounded-md p-6 relative">
          <img src={product.image} alt={product.title} className="w-full h-96 object-contain mb-4 rounded-lg" />
          <button onClick={handleWishlistClick} className="absolute top-4 right-4">
            {isWishlisted ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-gray-500 text-2xl" />}
          </button>
          <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
          <p className="text-xl text-gray-700 mb-4">{product.price}</p>
          <div className="mt-4">
            {product.sizes.map(size => (
              <button
                key={size}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
                onClick={() => handleAddToCart(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold text-left mb-4">OTHER POPULAR PRODUCTS</h2>
        <div className="bg-white py-8 px-4">
          <div className="flex items-center justify-center gap-4">
            <button onClick={handlePrev} className="text-2xl"><FaChevronLeft /></button>
            <div className="flex gap-4 overflow-hidden justify-center w-full">
              {visibleProducts.map((product, index) => (
                <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`} key={index} className="flex flex-col items-center gap-2">
                  <div className="w-64 h-64 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                    <img src={product.image} alt={product.title} className="object-contain w-full h-full" />
                  </div>
                  <p className="text-lg font-semibold text-center">{product.title.toUpperCase()}</p>
                </Link>
              ))}
            </div>
            <button onClick={handleNext} className="text-2xl"><FaChevronRight /></button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
