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
        <div className="text-black py-16"> {/* Changed text-white to text-black */}
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
                        <h2 className="text-base font-semibold leading-4">NEED A HAND?</h2>
                        <Link to="/faq" className="hover:text-gray-900 text-base leading-4 mt-4">FAQ</Link> {/* Changed hover:text-blue-400 to hover:text-gray-900 */}
                        <Link to="/size-guide" className="hover:text-gray-900 text-base leading-4 mt-4">Size Guide</Link>
                        <Link to="/delivery-guide" className="hover:text-gray-900 text-base leading-4 mt-4">Delivery Guide</Link>
                        <Link to="/payment-options" className="hover:text-gray-900 text-base leading-4 mt-4">Payment Options</Link>
                    </div>
                    <div className="flex flex-col lg:w-1/2 items-start text-left">
                        <h2 className="text-base font-semibold leading-4">EXPLORE</h2>
                        <Link to="/about-us" className="hover:text-gray-900 text-base leading-4 mt-4">About Us</Link>
                        <Link to="/faq" className="hover:text-gray-900 text-base leading-4 mt-4">Careers</Link>
                        <Link to="/faq" className="hover:text-gray-900 text-base leading-4 mt-4">Positive Impacts</Link>
                        <Link to="/faq" className="hover:text-gray-900 text-base leading-4 mt-4">Store Locations</Link>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-16">
                    <p className="text-base leading-4 mt-2">© 2024 Nicks Collection. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer1;
