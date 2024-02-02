import React, { useState, useEffect } from 'react';
import zara1 from '../../Assets/swiper.jpg'
import zara2 from '../../Assets/zara3.jpg'

import './slider.module.css'

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    zara1,zara2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Run only on component mount and unmount

  return (
    <div className="relative w-full h-75 overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Slider Image"
        className="w-full h-full object-cover transition-opacity duration-500"
      />
    </div>
  );
};

export default Swiper;
