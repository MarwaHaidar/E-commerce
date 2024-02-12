import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WishListProduct from './wishListItems';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DataContext from '../../Context';

const Items = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { itemsCount, setItemsCount } = useContext(DataContext)


  const nextSlide = () => {
    const remainingProducts = wishlistProducts.length - (startIndex + 4);
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


  const userId = '65a8f6cff242b58ff5272d12';
  const removeItem = (productId) => {
    axios.patch('http://localhost:5000/user/wishlist/remove-item', {
      userId,
      productId,
    })
      .then(response => {
        console.log('Item removed successfully:', response);
        // Update the wishlistProducts state after item removal
        setWishlistProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
        // Fetch and update the items count from the backend
        axios.get(`http://localhost:5000/user/wishlist/${userId}`)
          .then(response => {
            const count = response.data.result;
            console.log("Wishlist count:", count);
            setItemsCount(count);
            console.log("Items count updated:", count);
          })
          .catch(error => {
            console.error("Error fetching wishlist count:", error);
            // Handle the error appropriately
          });
      })
      .catch(error => {
        console.error('Error removing item:', error);
        // Handle the error appropriately
      });
  };






  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/user/wishlist/${userId}`)
        .then(response => {
          const wishes = response.data.data.wishlist;
          const count = response.data.result;
          console.log("Wishlist count:", count);
          setWishlistProducts(wishes);
          console.log("Wishlist products updated:", wishes);
          setItemsCount(count);
          console.log("Wishlist update:", count);
        })
        .catch(error => console.error("Error fetching wishlist:", error));
    }
  }, [userId]);




  return (
    <div className="flashsale">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ marginLeft: '80px' }}>Wishlist({itemsCount})</span>
        <button style={{ marginRight: '125px', border: 'solid black 1px', padding: '10px 10px 10px 10px' }}>Move all to bag</button>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
          <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" onClick={prevSlide}>
            <FaChevronLeft className="text-gray-700 h-6 w-6" />
          </div>
          {wishlistProducts && wishlistProducts.slice(startIndex, startIndex + 4).map((product) => (
            <WishListProduct key={product.productId} product={product} removeItem={removeItem} />
          ))}
          <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer" onClick={nextSlide}>
            <FaChevronRight className="text-gray-700 h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
