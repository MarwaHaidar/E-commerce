import React from 'react'
import './justForYouItems.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import JustForYouProduct from '../JustForYouItems/justForYou';

const JustForYouItems = ({ products }) => {
  const [startIndex, setStartIndex] = useState(0);
  // const [newIndex, setNewIndex] = useState(startIndex);

  const nextSlide = () => {
    const remainingProducts = products.length - (startIndex + 4);
    if (remainingProducts > 0) {
      const newStartIndex = startIndex + 1;
      setStartIndex(newStartIndex);
     
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      const newStartIndex = startIndex - 1;
      setStartIndex(newStartIndex);
      
    }
  };

  return (
    <div className="flashsale">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
                <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" onClick={prevSlide}>
                    <FaChevronLeft className="text-gray-700 h-6 w-6" />
                </div>
                {products.slice(startIndex, startIndex + 4).map((product) => (
                    <JustForYouProduct key={product.id} product={product} />
                ))}
                <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" onClick={nextSlide}>
                    <FaChevronRight className="text-gray-700 h-6 w-6" />
                </div>
            </div>
        </div>
    </div>
);
};

export default JustForYouItems;