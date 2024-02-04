import React from 'react';
import './justForYouItems.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart,faEye);

const JustForYouProduct = ({ product, onClick }) => {
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
    return (
        <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
                {/* Discount Box */}
                <div className="absolute top-0 left-0 z-10" style={{ marginTop: '7px', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="bg-greenish-blue text-white font-bold px-2 py-1 rounded" style={{ width: 'fit-content' }}>New</div>
                    <FontAwesomeIcon icon="fa-solid fa-eye" style={{color: "#07393C", marginTop: '7px', marginRight: '10px'}} />
                </div>
                
                {/* Product Image */}
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-0.8 lg:h-full lg:w-full"
                />
             </div>
             {/* Add to cart Box */}
             <div className="absolute left-0 w-full text-center">
                <div className="bg-greenish-blue text-white font-bold px-2 py-1 rounded"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{color: "#ffffff",}} />Add to cart</div>
             </div> 
            <div className="mt-10 flex justify-between items-center">
                <div>
                    <h3 className="text-lg text-black font-bold">
                        <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                    <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-1">${product.price}</span>
                        <span className="text-black text-lg line-through mr-14">$50</span>
                    </div>
                     {/* Render Rating Stars */}
                     {renderRatingStars(product.rating)}
                </div>
            </div>
        </div>
    );
};

export default JustForYouProduct;
