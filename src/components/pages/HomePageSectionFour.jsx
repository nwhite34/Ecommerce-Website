import React, { useState } from 'react';

export default function Index() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="mx-auto container py-16 px-6 pb-28">
      <div className="flex flex-col lg:flex-row justify-center items-center xl:space-x-44 lg:space-x-24 space-y-8 lg:space-y-0">
        <div className="md:px-12 lg:px-0 flex flex-col justify-start items-start lg:w-2/5 xl:w-3/12">
          <div>
            <p className="text-sm leading-3 text-gray-400">Subscribe to our newsletter</p>
          </div>
          <div className="xl:mt-4 mt-2">
            <p className="text-4xl font-semibold leading-9 text-gray-100">Join Our Mailing List</p>
          </div>
          <div className="xl:mt-6 mt-4">
            <p className="text-base leading-6 text-gray-200">Subscribe to our newsletter to stay in the loop. Our newsletter is sent once a week on every Friday to get the latest news and updates.</p>
          </div>
          {subscribed ? (
            <div className="xl:mt-12 mt-6 w-full">
              <p className="text-base leading-6 text-green-600">Thanks for subscribing! Check your email for confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full ">
              <div className="xl:mt-12 mt-6 w-full">
                <input 
                  className="focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 pb-1 border border-gray-600 w-full h-12 sm:w-96 md:w-full lg:w-72 px-4 text-base leading-4 text-gray-600 placeholder-gray-500" 
                  placeholder="Email address" 
                  type="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="xl:mt-4 mt-2 w-full ">
                <button type="submit" className="hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 h-12 w-full sm:w-96 md:w-full lg:w-72 bg-gray-800 text-base font-medium leading-4 text-white">
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
          <img src="https://i.ibb.co/CzGcZF4/pexels-katie-e-3671083-1.png" alt="girl" />
        </div>
      </div>
    </div>
  );
}
