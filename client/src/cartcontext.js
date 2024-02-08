import React, { createContext, useState, useContext } from 'react';

// Create a context for managing cart state
const CartContext = createContext();

// Custom hook for using the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component manages the cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  const addToCart = (product) => {
    setCart([...cart,product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
