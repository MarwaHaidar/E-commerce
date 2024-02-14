import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WishListProduct from './wishListItems';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DataContext from '../../Context';

const Items = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { itemsCount, setItemsCount } = useContext(DataContext)


  // const nextSlide = () => {
  //   const remainingProducts = wishlistProducts.length - (startIndex + 4);
  //   if (remainingProducts > 0) {
  //     const newStartIndex = startIndex + 1;
  //     setStartIndex(newStartIndex);
  //   }
  // };

  // const prevSlide = () => {
  //   if (startIndex > 0) {
  //     const newStartIndex = startIndex - 1;
  //     setStartIndex(newStartIndex);
  //   }
  // };


  const userId = '65a8f6cff242b58ff5272d12';
  const removeItem = (productId) => {
    axios.patch('http://localhost:5000/user/wishlist/remove-item', {
      userId,
      productId,
    })
      .then(response => {
        console.log('Item removed successfully:', response);
        setWishlistProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));

        axios.get(`http://localhost:5000/user/wishlist/${userId}`)
          .then(response => {
            const count = response.data.result;
            console.log("Wishlist count:", count);
            setItemsCount(count);
            console.log("Items count updated:", count);
          })
          .catch(error => {
            console.error("Error fetching wishlist count:", error);
          });
      })
      .catch(error => {
        console.error('Error removing item:', error);
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
        <span className="font-semibold text-md md:text-md lg:text-2xl xl:text-2xl pl-20 ml-20" style={{ marginBottom: '-5px', marginTop: '20px' }}>You have {itemsCount} items in your Wishlist</span>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative" style={{ marginTop: '-50px' }}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {wishlistProducts && wishlistProducts.map((product) => (
            <WishListProduct key={product.productId} product={product} removeItem={removeItem} />
          ))}
        </div>
      </div>
    </div>






  );
};

export default Items;
