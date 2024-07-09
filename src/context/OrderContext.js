import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const ordersList = querySnapshot.docs.map(doc => doc.data());
          setOrders(ordersList);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  const createOrder = async (orderData) => {
    if (currentUser) {
      try {
        const newOrder = {
          ...orderData,
          userId: currentUser.uid,
          createdAt: new Date(),
        };
        await addDoc(collection(db, 'orders'), newOrder);
        setOrders([...orders, newOrder]);
        console.log('Order created successfully');
      } catch (error) {
        console.error('Error creating order:', error);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
