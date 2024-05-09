// BasePage.js
import React from 'react';
import HomePage from './HomePage';
import PromoBar from '../PromoBar';
import NavBar from '../NavBar';

function BasePage() {
  return (
    <> 
      {/* Move PromoBar to be above NavBar */}
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
     
        <NavBar />

        <div className="min-h-[120vh] relative">
    
      
        <HomePage />
     
    </div>
    </>
  );
}

export default BasePage;
