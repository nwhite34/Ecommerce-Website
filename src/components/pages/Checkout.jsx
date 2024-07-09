import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import StepIndicator from './StepIndicator';
import InformationSection from './Step1Information';
import FulfillmentSection from './Step2Fulfillment';
import ShippingSection from './Step3Shipping';
import Step4Payment from './Step4Payment';

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
    <div className="checkout-container">
      <StepIndicator step={step} />
      {step === 1 && <InformationSection nextStep={nextStep} />}
      {step === 2 && <FulfillmentSection nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <ShippingSection nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <Step4Payment prevStep={prevStep} handleOrderProcess={handleOrderProcess} />}
      {step === 5 && <div className="text-2xl font-bold text-center">Order Confirmed!</div>}
    </div>
  );
};

export default Checkout;
