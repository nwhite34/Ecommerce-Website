import React, { useEffect } from 'react';

function Banner() {
  useEffect(() => {
    const banner = document.querySelector('.banner');
    const text = "ENDS TONIGHT";
    const textHTML = `
      <span class="text-lg md:text-xl text-white mr-4">${text}</span>
      <span class="text-lg md:text-xl text-blue-500 mr-4">${text}</span>
    `;

    // Adjust the repeat count dynamically or use a larger number to fill the banner width
    let repeatedText = textHTML.repeat(8); // Adjust this number as needed

    banner.innerHTML = repeatedText;
  }, []);

  return (
    <div
      className="bg-black text-white flex items-center banner h-12 overflow-hidden whitespace-nowrap mt-40"
      style={{ justifyContent: 'space-between' }}
    ></div>
  );
}

export default Banner;
