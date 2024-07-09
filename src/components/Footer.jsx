import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import salebanner from '../images/collection.png';

const Footer1 = () => {
    const navigate = useNavigate();

    const handleBannerClick = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 lg:gap-12 mt-8">
                    <div className="flex-shrink-0 mb-8 lg:mb-0 lg:w-1/2 flex justify-center">
                        <div className="w-32 h-32 mt-20 lg:mt-0">
                            <img 
                                src={salebanner} 
                                alt="Sale Banner" 
                                className="w-full h-full object-full cursor-pointer" 
                                onClick={handleBannerClick} 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-1/2 items-start text-left">
                        <h2 className="text-base font-semibold leading-4 text-white">NEED A HAND?</h2>
                        <Link to="/faq" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">FAQ</Link>
                        <Link to="/size-guide" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Size Guide</Link>
                        <Link to="/delivery-guide" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Delivery Guide</Link>
                        <Link to="/payment-options" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Payment Options</Link>
                    </div>
                    <div className="flex flex-col lg:w-1/2 items-start text-left">
                        <h2 className="text-base font-semibold leading-4 text-white">EXPLORE</h2>
                        <Link to="/faq" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">About Us</Link>
                        <Link to="/faq" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Careers</Link>
                        <Link to="/faq" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Positive Impacts</Link>
                        <Link to="/faq" className="hover:text-gray-300 text-base leading-4 mt-4 text-white cursor-pointer">Store Locations</Link>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-16">
                    <p className="text-base leading-4 mt-2 text-white"></p>
                </div>
            </div>
        </div>
    );
};

export default Footer1;
