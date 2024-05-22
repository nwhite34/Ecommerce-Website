import React from 'react';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import Card from './Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const items = [
  {
    image: 'https://source.unsplash.com/featured/?men,formal-shirt',
    title: 'Formal Shirt',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,casual-shirt',
    title: 'Casual Shirt',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,denim-shirt',
    title: 'Denim Shirt',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,linen-shirt',
    title: 'Linen Shirt',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,chinos',
    title: 'Chinos',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,jeans',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,joggers',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?men,dress-pants',
    title: 'Dress Pants',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
  },
];

function MensSection() {
  const { addToWishlist } = useWishlist();
  const { addToCart, toggleCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toggleCart();
  };

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Men's Section</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Card
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              sizes={item.sizes}
              onAddToCart={handleAddToCart}
              onAddToWishlist={addToWishlist}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MensSection;
