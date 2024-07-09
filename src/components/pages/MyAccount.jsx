import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import { useAuth } from '../../context/AuthContext';

function MyAccount() {
  const { wishlist, removeFromWishlist, addToWishlist } = useWishlist();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [currentUser.uid]);

  const handleWishlistClick = (item) => {
    if (wishlist.some((wishlistItem) => wishlistItem.title === item.title)) {
      removeFromWishlist(item.title);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <>
      <NavBar />
      <PromoBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>
        
        <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {wishlist.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 relative">
                <Link to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                  <img src={item.mainImage} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                </Link>
                <button
                  onClick={() => handleWishlistClick(item)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                >
                  {wishlist.some((wishlistItem) => wishlistItem.title === item.title) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-700">${item.price}</p>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => removeFromWishlist(item.title)}
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-4 mt-8">Order History</h2>
        {loadingOrders ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p>You have no orders</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Order Number: {order.orderNumber}</h3>
                  <p className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</p>
                </div>
                <p className="text-gray-700">Total: ${order.total}</p>
                <p className="text-gray-700">Date: {new Date(order.date).toLocaleDateString()}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-bold mb-2">Items:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <Link to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                          <img src={item.mainImage} alt={item.title} className="w-16 h-16 object-cover rounded-lg mr-2" />
                        </Link>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-gray-700">{item.size} - ${item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
