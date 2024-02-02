import React from 'react';
import './featured.css'

const FeaturedProduct = ({ product, onClick }) => {
    const renderRatingStars = (rating) => {
        const maxStars = 5;
        const stars = [];
        const numStars = Math.min(rating, maxStars); // Limit to a maximum of 5 stars
    
        for (let i = 0; i < numStars; i++) {
            stars.push(<span key={i} className="text-yellow-400 ">★</span>);
        }
        for (let i = rating; i < maxStars; i++) {
            stars.push(<span key={i} className="text-transparent ">★</span>);
        }
        return stars;
    };

    return (
        <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
          {/* Discount Box
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-lightgreenish-blue text-white font-bold px-2 py-1 rounded">20%</div>
          </div> */}
          {/* Product Image */}
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-0.8 lg:h-full lg:w-full"
          />
          {/* ADD to card */}
          <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 invisible group-hover:visible'>
            <div className="bg-greenish-blue text-white font-bold px-5 text-center py-1 rounded ">ADD TO CART</div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg text-black font-bold">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900 mr-24">${product.price}</span>
              {/* <span className="text-black text-lg line-through mr-14">$50</span> */}
              {/* Render Rating Stars */}
              {renderRatingStars(product.rating)}
            </div>
          </div>
    {/* Rating and Button */}
    {/* <div className='absolute bottom-0 left-1/2  transform -translate-x-1/2 z-10 invisible group-hover:visible'>
       <div className="bg-greenish-blue text-white font-bold px-5 text-center py-1 rounded ">ADD TO CART</div>
       </div> */}
  </div>
</div>

        
    );
};

export default FeaturedProduct;




      