import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";


const ProductCard = ({ products, addToWishList }) => {

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`h-4 w-4 font-normal inline-block ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };



  return (
    <div className="grid grid-cols-1 mb-20 gap-x-6 gap-y-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 large:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
      {products.map((product) => {
        const rating = Math.floor(Math.random() * 2) + 3;
        return (
          <div key={product._id} className="group relative">
            <div className="bg-white p-3 w-79 rounded-lg shadow-md transition-transform transform-gpu hover:scale-105 relative">
              <a href={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 transform-gpu hover:scale-105 transition-transform">
                  <img
                    src={product.imageCover}
                    alt={`image of ${product.name}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
              </a>
              <h3 className="mt-4 text-s text-gray-900 font-bold whitespace-nowrap ml-3">{product.name}</h3>
              <div className="flex items-center mt-1">
                <span className=" px-2 ml-1 rounded-full text-base font-bold text-black">$ {product.price - (product.price * 0.15)}</span>
                <span className=" px-2  rounded-full text-base font-bold text-red-500" style={{ textDecoration: 'line-through' }}>$ {product.price}</span>
                <span className="ml-16">{generateStars(rating)}</span>

                {/* <span className="px-2 rounded-full text-base font-bold text-black"></span> */}
              </div>



              <div className="absolute bottom-5 right-5 p-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-5 right-5 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); addToWishList(product._id); }}>
                <FiHeart className="h-6 w-6 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductCard;