import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Banner() {
  const [bannerWidth, setBannerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setBannerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const text = "ENDS TONIGHT ";
  const singleTextWidth = text.length * 14; // Approximate width of each character
  const repetitions = Math.ceil(bannerWidth / singleTextWidth) + 1; // Additional repetition for continuous effect

  const textHTML = `
    <span class="text-lg md:text-xl text-white mr-4">${text}</span>
    <span class="text-lg md:text-xl text-blue-500 mr-4">${text}</span>
  `;

  const repeatedText = textHTML.repeat(repetitions);
  const fullTextWidth = singleTextWidth * repetitions;
  const totalTravelDistance = bannerWidth + fullTextWidth; // Calculate the total distance needed to move off-screen

  const props = useSpring({
    from: { transform: `translateX(${bannerWidth}px)` }, // Start off-screen to the right
    to: { transform: `translateX(-${totalTravelDistance}px)` }, // Move to left off-screen beyond the full text width
    config: { duration: 40000, precision: 0.1 },
    loop: true // Enable looping
  });

  return (
    <div className="bg-black flex items-center banner h-12 overflow-hidden whitespace-nowrap mt-40">
      <animated.div className="relative" style={props}>
        <div dangerouslySetInnerHTML={{ __html: repeatedText }} />
      </animated.div>
    </div>
  );
}

export default Banner;
