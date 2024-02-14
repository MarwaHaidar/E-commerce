import React from 'react';
import './featured.css';

const FeaturedProduct = ({ product, onClick }) => {
  console.log("product:", product); // Make sure product is defined

  const renderRatingStars = (rating) => {
    const maxStars = 5;
    const stars = [];
    const numStars = Math.min(rating, maxStars); // Limit to a maximum of 5 stars

    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    for (let i = rating; i < maxStars; i++) {
      stars.push(<span key={i} className="text-transparent">★</span>);
    }
    return stars;
  };
  let rating = Math.floor(Math.random() * 3) + 3;

  return (
    <div key={product._id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 mt-5 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
        <img
          src={product.imageCover}
          className="image group-hover:opacity-0.8 lg:h-60 lg:ml-8 lg:w-80 my-5"
          alt={product.name}
        />
      </div>

      <div className="flex justify-start">
        <div className="flex flex-col items-start">
          <h3 className="text-lg text-center font-bold mt-3 mr-4 py-1 px-2 rounded-full">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </a>
          </h3>
          <span className="text-lg font-bold text-black-500 px-2 rounded-full mr-4">
            ${product.price}
            <span className="ml-3">{renderRatingStars(rating)}</span>
          </span>

        </div>
      </div>


    </div>
  );
};

export default FeaturedProduct;
