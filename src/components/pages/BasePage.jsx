// BasePage.js
import React from 'react';
import HomePage from './HomePage';
import HomePageSectionOne from './HomePageSectionOne';
import HomePageSectionTwo from './HomePageSectionTwo';
import HomePageSectionThree from './HomePageSectionThree';
import HomePageSectionFour from './HomePageSectionFour';
import HomePageSectionFive from './HomePageSectionFive';
import HomePageSectionSix from './HomePageSectionSix';
import HomePageSectionSeven from './HomePageSectionSeven';
import HomePageSectionEight from './HomePageSectionEight';


import PromoBar from '../PromoBar';
import NavBar from '../Navbar';
import Footer from '../Footer';

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
        <HomePageSectionOne/>
        <HomePageSectionSeven/>
        <HomePageSectionTwo/>
        <HomePageSectionThree/>
        <HomePageSectionSix/>
        <HomePageSectionEight/>
        <HomePageSectionFive/>
        <HomePageSectionFour/>
       
  
        <Footer/>
    </div>
    </>
  );
}

export default BasePage;
