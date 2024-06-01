import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';

const PaymentOptionsPage = () => {
  const [otherProducts, setOtherProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOtherProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchOtherProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % otherProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + otherProducts.length) % otherProducts.length);
  };

  const visibleProducts = otherProducts.slice(currentIndex, currentIndex + 7).concat(otherProducts.slice(0, Math.max(0, (currentIndex + 7) - otherProducts.length)));

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20 min-h-screen">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-8">What Payment Types Do You Accept?</h1>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                  <th className="bg-gray-100 p-2 text-gray-800 font-bold md:border md:border-grey-500 text-left block md:table-cell">Payment Method</th>
                  <th className="bg-gray-100 p-2 text-gray-800 font-bold md:border md:border-grey-500 text-left block md:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                <tr className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Credit Card</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">At Nick's Collection, we accept Visa, MasterCard and American Express online. We take security very seriously - we do not store your credit card details and the data you enter is securely encrypted meaning you can shop with us in complete confidence.</td>
                </tr>
                <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Apple Pay</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Apple Pay is a convenient and secure way to make payments. With Apple Pay, users can make purchases quickly and simply, using their iPhone, iPad, Apple Watch, or Mac. Your payment information is stored securely in your Apple device, eliminating the need to manually enter payment information for each transaction. By using Apple Pay, you can enjoy a fast, easy, and secure checkout experience.</td>
                </tr>
                <tr className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Google Pay</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Google Pay is a digital payment solution that you can use to make secure and convenient transactions. With Google Pay, you can complete purchases quickly and easily, without having to re-enter your payment information. Your payment information is securely stored within your Google account.</td>
                </tr>
                <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Afterpay</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Now with an increased limit of $3,000. Afterpay is fully integrated in the Nick's Collection online checkout. All you need to do is choose Afterpay as your payment option when you’re ready to buy. Afterpay splits your payments over four equal installments due every fortnight. Nominate the card you want to use and automatic payments are scheduled for you. There are no lengthy process or wait times. Afterpay simply uses your mobile phone number and a few personal details to create your account instantly and securely. Please note that Afterpay may impose late payment fees if payment isn’t made on the scheduled date, so for further details about Afterpay and their terms and conditions, visit Afterpay.</td>
                </tr>
                <tr className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Zip Pay</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Zip Pay is a reusable account that lets you shop now and pay later. Once approved start shopping online and in-store. Please note that Zip Pay is not a service provided by Nick's Collection. It is a facility offered by Zip Co Limited. Minimum monthly repayments are required.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-40 mb-40">
        <h2 className="text-2xl font-bold text-left mb-4">OTHER POPULAR PRODUCTS</h2>
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
    </>
  );
};

export default PaymentOptionsPage;
