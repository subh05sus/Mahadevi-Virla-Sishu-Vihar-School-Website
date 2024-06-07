import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add scroll event listener when component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-24 right-4 z-50 bg-gray-800 hover:bg-black transition-all duration-200 text-white font-bold p-3 portrait:p-1 rounded-full ${isVisible ? 'block' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
};

export default GoToTopButton;
