
import React from 'react';
import HomePage from './HomePage'; // Import the HomePage component or any other page component
import Navbar from '../Navbar'; // Import the HomePage component or any other page component


function BasePage() {
  return (
   
    <div className='h-full'> 
    <Navbar/>
      <main className="max-w-5xl mx-auto">
        <HomePage /> {/* Swap with other page components as needed */}
      </main>

      </div>
  );
}

export default BasePage;
