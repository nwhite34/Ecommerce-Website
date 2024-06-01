import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  const saveCartToFirestore = useCallback(async (newCart) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'cart', 'cartData'), { cart: newCart });
      } catch (error) {
        console.error('Error saving cart to Firestore:', error);
      }
    }
  }, [user]);

  const loadCartFromFirestore = useCallback(async () => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'cart', 'cartData');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCart(docSnap.data().cart);
        }
      } catch (error) {
        console.error('Error loading cart from Firestore:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth State Changed:', currentUser); // Log the authentication state
      setUser(currentUser);
      if (currentUser) {
        loadCartFromFirestore();
      }
    });

    return () => unsubscribe();
  }, [loadCartFromFirestore]);

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    saveCartToFirestore(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    saveCartToFirestore(newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCartToFirestore([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toggleCart, isCartOpen, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
