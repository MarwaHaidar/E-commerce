import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Categoriescard from './Categoriescard';
import Viewproductbtn from '../Viewprodbtn/vpb';
import './browsecategory.css'

const Browsecategory = ({ categories }) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    const remainingCategories = categories.length - (startIndex + 4);
    if (remainingCategories > 0) {
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
    <>

      <div className='browsecategory'>
        <div className='brosewcategories'>
          <p >Browse By Category</p></div>
        <div className="mx-auto  max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-20px] relative" >

            <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" >
              <div className="rounded-full bg-gray-200 p-4 hover:bg-gray-300 transition-colors duration-300" onClick={prevSlide}>
                <FaChevronLeft className="text-gray-700 h-6 w-6" />
              </div>
            </div>
            {categories.slice(startIndex, startIndex + 4).map((category) => (
              <Categoriescard key={category.id} category={category} />
            ))}
     <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" >
              <div className="rounded-full bg-gray-200 p-4 hover:bg-gray-300 transition-colors duration-300" onClick={nextSlide}>
                <FaChevronRight className="text-gray-700 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Viewproductbtn text="View All Categories" />
    </>
  );
};

export default Browsecategory;

