import React from 'react';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import Card from './Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const items = [
  {
    image: 'https://source.unsplash.com/featured/?women,formal-dress',
    title: 'Formal Dress',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,casual-dress',
    title: 'Casual Dress',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,denim-jacket',
    title: 'Denim Jacket',
    price: 'A$89.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,linen-top',
    title: 'Linen Top',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,skirt',
    title: 'Skirt',
    price: 'A$39.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,jeans',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,joggers',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
  },
  {
    image: 'https://source.unsplash.com/featured/?women,pants',
    title: 'Pants',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
  },
];

function WomenSection() {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Women's Section</h1>
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

export default WomenSection;
