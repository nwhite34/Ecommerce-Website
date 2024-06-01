import React, { useState } from 'react';
import Step1Information from './Step1Information';
import Step2Fulfillment from './Step2Fulfillment';
import Step3Shipping from './Step3Shipping';
import Step4Payment from './Step4Payment';
import StepIndicator from './StepIndicator';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import CartSummary from './CartSummary';
import { useCart } from '../../context/CartContext';

const Checkout = () => {
  const { clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderProcessed, setOrderProcessed] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleOrderProcess = () => {
    setOrderProcessed(true);
    clearCart();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Information nextStep={nextStep} />;
      case 2:
        return <Step2Fulfillment nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Shipping nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4Payment prevStep={prevStep} handleOrderProcess={handleOrderProcess} />;
      default:
        return <Step1Information nextStep={nextStep} />;
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto pt-40 pb-20 min-h-screen flex flex-col justify-center items-center">
        <StepIndicator step={step} className="mb-8" />
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
        {orderProcessed ? (
          <div className="text-center text-2xl font-bold text-green-500">
            Your order is being processed!
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-4">
            <div className="w-full max-w-3xl mb-8 md:mb-0">
              {renderStep()}
            </div>
            <div className="md:ml-8 w-full max-w-3xl">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
