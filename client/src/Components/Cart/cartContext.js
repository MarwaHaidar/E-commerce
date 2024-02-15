import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const deleteItem = async (productId, color, size) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/user/cart/deleteitem`, {
        data: { productId, color, size },
        withCredentials: true
      });
      if (response.status === 200) {
        console.log('Item deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error('Error deleting item');
    }
  };

  // Other functions to add items, update quantities, etc.

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, deleteItem, cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
