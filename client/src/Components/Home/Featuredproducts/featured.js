import React, { useEffect, useState } from 'react';
import './featured.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FeaturedProduct from './featuredcard';
import Viewproductbtn from '../Viewprodbtn/vpb';
import axios from 'axios';

const Featured = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:5000/products?limit=10').then((res) => {
      const featuredProducts = res.data.data;
      setProducts(featuredProducts);
    });
  }, []);


  return (
    <>
      <div className="featured">
        <div className='exploreproducts'>
          <p >Explore Our Products</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
            <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" >
              <div className="rounded-full bg-gray-200 p-4 hover:bg-gray-300 transition-colors duration-300" onClick={prevSlide}>
                <FaChevronLeft className="text-gray-700 h-6 w-6" />
              </div>
            </div>

            {products.slice(startIndex, startIndex + 4).map((product) => (
              <FeaturedProduct key={product.id} product={product} />
            ))}
            <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" >
              <div className="rounded-full bg-gray-200 p-4 hover:bg-gray-300 transition-colors duration-300" onClick={nextSlide}>
                <FaChevronRight className="text-gray-700 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Viewproductbtn text="View All Products" />
    </>
  );
};

export default Featured;
