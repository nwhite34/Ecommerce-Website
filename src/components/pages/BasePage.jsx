import React from 'react';
import HomePage from './HomePage';
import HomePageSectionOne from './HomePageSectionOne';
import HomePageSectionTwo from './HomePageSectionTwo';
// import HomePageSectionThree from './HomePageSectionThree';
import HomePageSectionFour from './HomePageSectionFour';
import HomePageSectionFive from './HomePageSectionFive';
import HomePageSectionSix from './HomePageSectionSix';
import HomePageSectionSeven from './HomePageSectionSeven';
import PromoBar from '../PromoBar';
import NavBar from '../Navbar';
import Footer from '../Footer';

function BasePage() {
  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="min-h-[120vh] relative">
        <HomePage />
        <HomePageSectionOne />
        <HomePageSectionSeven />
        <HomePageSectionTwo />
        {/* <HomePageSectionThree /> */}
        <HomePageSectionSix />
        <HomePageSectionSeven />
        <div className='bg-gray-900'>
        <HomePageSectionFive />
        <HomePageSectionFour />
        </div>
        <Footer />
       
      </div>
    </>
  );
}

export default BasePage;
