import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  const saveWishlistToFirestore = useCallback(async (newWishlist) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'wishlist', 'wishlistData'), { wishlist: newWishlist });
      } catch (error) {
        console.error('Error saving wishlist to Firestore:', error);
      }
    }
  }, [user]);

  const loadWishlistFromFirestore = useCallback(async () => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'wishlist', 'wishlistData');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().wishlist || []);
        }
      } catch (error) {
        console.error('Error loading wishlist from Firestore:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadWishlistFromFirestore();
      }
    });

    return () => unsubscribe();
  }, [loadWishlistFromFirestore]);

  const addToWishlist = (item) => {
    const existingItem = wishlist.find(wishlistItem => wishlistItem.title === item.title);
    if (existingItem) {
      const newWishlist = wishlist.map(wishlistItem =>
        wishlistItem.title === item.title ? item : wishlistItem
      );
      setWishlist(newWishlist);
      saveWishlistToFirestore(newWishlist);
    } else {
      const newWishlist = [...wishlist, item];
      setWishlist(newWishlist);
      saveWishlistToFirestore(newWishlist);
    }
  };

  const removeFromWishlist = (title) => {
    const newWishlist = wishlist.filter((item) => item.title !== title);
    setWishlist(newWishlist);
    saveWishlistToFirestore(newWishlist);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
