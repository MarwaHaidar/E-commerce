import React from 'react';
 import { useCart } from '../../../../cartcontext'; // Import the useCart hook from the CartProvider file
import './flashsale.module.css';
 import axios from 'axios';
 //import axiossconfig from '../../../axiosconfig'; 
// import { useNavigate } from 'react-router-dom'; // Import useNavigate



const FlashSaleProduct = ({ product }) => {
  const { addToCart } = useCart(); // Use the useCart hook to access cart and setCart functions
  // const navigate = useNavigate();
  const handleAddToCart = async () => {
    try {
      // Make sure you have access to the user's ID in your component
      // const user_id = user._id; // Assuming user._id is accessible
  
      // Make a request to add the product to the cart
      const response = await axios.post(
        'http://localhost:5000/user/cart',
        {
          //  userId: user_id,
          productId: product._id,
          quantity: 1
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`
        //   }
        // }
      );
      
  
      // Handle the response as needed
      console.log('Product added to cart:', response.data);
  
      // You may want to trigger additional actions here after successfully adding to the cart
  
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await axios.post('http//localhost:5000/user/cart', {
  //       userId: 'user_id', // Replace with actual user ID
  //       productId: product.id,
  //       quantity: 1, // You may adjust the quantity as needed
  //       currency: 'USD', // Replace with the appropriate currency
  //     });
      
  //     // Update the cart state in your React context if needed
  //     setCart(response.data.cart);
      
  //     // You may also show a success message or perform other actions upon successful addition to the cart
  //     console.log('Product added to cart:', response.data);
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //   }
  // }

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
    <div key={product._id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 mt-5 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
        {/* Discount Box */}
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-lightgreenish-blue text-white font-bold px-2 py-1 rounded w-12">20%</div>
        </div>
        {/* Product Image */}
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-contain object-center group-hover:opacity-0.8 lg:h-60 lg:w-80"
        />
        {/* ADD to cart */}
        <div className='relative transform-translate-x-1/2 z-10 invisible group-hover:visible lg:relative lg:mt-2'>
          <div className="bg-greenish-blue py-2 text-xs text-white font-bold px-5 text-center lg:py-3 rounded ">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
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
            <span className="text-lg font-bold text-gray-900 mr-1">${product.price}</span>
            <span className="text-black text-lg line-through mr-14">$50</span>
            {/* Render Rating Stars */}
            {renderRatingStars(product.rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProduct;
