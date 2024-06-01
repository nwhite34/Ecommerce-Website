import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function PromoBar() {
  // Content and styles for the promo bar
  const content = {
    message: "20% OFF SALE NOW!",
    bgColor: "#00CFCF",
  };

  // Spring animation properties
  const springProps = useSpring({
    from: { transform: 'translateX(100%)', visibility: 'hidden' }, // Start hidden off-screen
    to: async (next) => {
      while (true) {
        // Slide fully into view and become visible
        await next({ transform: 'translateX(0%)', visibility: 'visible' });
        // Pause for 3 seconds while fully visible
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Slide fully out to the left while visible
        await next({ transform: 'translateX(-100%)', visibility: 'visible' });
        // Reset back to the right side, while hidden
        await next({ transform: 'translateX(100%)', visibility: 'hidden' }); 
      }
    },
    reset: true, // Ensure that the animation loops properly
  });

  return (
    <div className="relative h-10 overflow-hidden sm:h-8 md:h-10">
      <animated.div
        className={`absolute w-full h-full flex justify-center items-center text-white px-2
          text-sm sm:text-xs md:text-sm lg:text-base`}
        style={{
          backgroundColor: content.bgColor,
          transform: springProps.transform, // Apply spring movement
          visibility: springProps.visibility, // Control visibility during reset
        }}
      >
        <span className="whitespace-nowrap">{content.message}</span>
      </animated.div>
    </div>
  );
}

export default PromoBar;
