import React, { useState, useEffect } from 'react';
import image1 from '../Assets/girl3.jpg'
import image2 from '../Assets/1.jpg'
import image3 from '../Assets/2.jpg'
import image4 from '../Assets/4.jpg'


import './ourStoryImage.module.css'

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    image1,image2,image3,image4
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

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
