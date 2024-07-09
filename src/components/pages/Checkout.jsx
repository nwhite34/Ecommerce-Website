import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import StepIndicator from './StepIndicator';
import InformationSection from './Step1Information';
import FulfillmentSection from './Step2Fulfillment';
import ShippingSection from './Step3Shipping';
import Step4Payment from './Step4Payment';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrder();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleOrderProcess = async () => {
    const orderData = {
      items: cart,
      total: cart.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0),
    };
    await createOrder(orderData);
    clearCart();
    nextStep();
  };

  return (
    <>
      <NavBar />
      <PromoBar />
      <div className="checkout-container h-screen">
        <StepIndicator step={step} />
        {step === 1 && <InformationSection nextStep={nextStep} />}
        {step === 2 && <FulfillmentSection nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <ShippingSection nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Step4Payment prevStep={prevStep} handleOrderProcess={handleOrderProcess} />}
        {step === 5 && <div className="text-2xl font-bold text-center mx-auto mt-32">Order Confirmed! Check your account to see the status of your order.</div>}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
