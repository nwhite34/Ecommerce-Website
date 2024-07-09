import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../Navbar';
import Footer from '../Footer';
import PromoBar from '../PromoBar';
import SizeGuideModal from './SizeGuideModal';
import ShippingHandlingModal from './ShippingHandlingModal';

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ProductPage = () => {
  const { title } = useParams();
  const productTitle = title.replace(/-/g, ' ');
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [sizeFitOpen, setSizeFitOpen] = useState(false);
  const [shippingHandlingOpen, setShippingHandlingOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const foundProduct = productsData.find(product => product.title.toLowerCase() === productTitle.toLowerCase());

        if (foundProduct) {
          setProduct(foundProduct);
          setMainImageIndex(0); // Set default main image index
          setIsWishlisted(wishlist.some(item => item.id === foundProduct.id));
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
  if (!product) return <Spinner />;

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <Header />
      <div className="container mx-auto mt-32 pt-20 pb-20">
        <div className="bg-white p-6 relative flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative mb-4 lg:mb-0 flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4">
              <img src={product.images[mainImageIndex]} alt={product.title} className="w-full h-full object-contain rounded-lg shadow-md" />
            </div>
            <div className="flex lg:flex-col items-center justify-center space-x-2 lg:space-x-0 lg:space-y-2 mt-4 lg:mt-0 lg:ml-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer ${index === mainImageIndex ? 'border-2 border-blue-500' : 'border-none'}`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-6 mt-8 lg:mt-0">
            <button onClick={handleWishlistClick} className="absolute top-4 right-4">
              {isWishlisted ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-gray-500 text-2xl" />}
            </button>
            <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
            <p className="text-xl text-gray-700 mb-4">{product.price}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className="px-4 py-2 rounded mr-2 mb-2 border-2 border-black text-black font-semibold bg-transparent hover:bg-black hover:text-white"
                    onClick={() => handleAddToCart(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                <h4 className="text-xl font-bold mb-4">Details</h4>
                {detailsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {detailsOpen && (
                <div>
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p><strong>Composition:</strong> {product.material}</p>
                  <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
                  <p><strong>Fit:</strong> {product.fit || 'Regular'}</p>
                  <p><strong>Length:</strong> {product.length || 'Standard'}</p>
                  <p><strong>Style:</strong> {product.style || 'Casual'}</p>
                  <p><strong>Elasticity:</strong> {product.elasticity || 'Non-stretch'}</p>
                </div>
              )}
            </div>
            <div className="border-t mt-4 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSizeFitOpen(!sizeFitOpen)}
              >
                <h4 className="text-xl font-bold mb-4">Size & Fit</h4>
                {sizeFitOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {sizeFitOpen && (
                <div>
                  <p>Please refer to our size guide to see what size is right for you! Keep in mind, sizes between brands are likely to vary, so please use the measurements as a guide only.</p>
                  <button className="text-blue-500 underline" onClick={() => setSizeGuideOpen(true)}>View Size Guide</button>
                </div>
              )}
            </div>
            <div className="border-t mt-4 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDeliveryOpen(!deliveryOpen)}
              >
                <h4 className="text-xl font-bold mb-4">Delivery & Returns</h4>
                {deliveryOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {deliveryOpen && (
                <div>
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Shipping Methods</th>
                        <th className="border px-4 py-2">Shipping Times</th>
                        <th className="border px-4 py-2">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Express</td>
                        <td className="border px-4 py-2">Metro 1-4 business days, Regional/Rural 1-7 business days</td>
                        <td className="border px-4 py-2">$13.99</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Standard</td>
                        <td className="border px-4 py-2">Metro 2-10 business days, Regional/Rural 2-13 business days</td>
                        <td className="border px-4 py-2">$10.99 or $2 for orders over $100</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-4">For other delivery methods, <Link to="/delivery-guide" className="text-blue-500 underline">click here</Link> for shipping and delivery times.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-40 mb-40">
        <h2 className="text-2xl font-bold text-left mb-4 ">OTHER POPULAR PRODUCTS</h2>
        <div className="bg-white py-8 px-4">
          <div className="flex items-center justify-center gap-4">
            <button onClick={handlePrev} className="text-2xl"><FaChevronLeft /></button>
            <div className="flex gap-4 overflow-hidden justify-center w-full">
              {visibleProducts.map((product, index) => (
                <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`} key={index} className="flex flex-col items-center gap-2">
                  <div className="w-64 h-64 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                    <img src={product.mainImage} alt={product.title} className="object-contain w-full h-full" />
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
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <ShippingHandlingModal isOpen={shippingHandlingOpen} onClose={() => setShippingHandlingOpen(false)} />
    </>
  );
};

export default ProductPage;
