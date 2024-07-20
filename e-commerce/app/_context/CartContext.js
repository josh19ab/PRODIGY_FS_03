import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize as an empty array
  const [openCart, setOpenCart] = useState(false); // State to manage cart visibility

  const toggleCart = () => {
    setOpenCart(prev => !prev); // Toggle the cart visibility
  };

  return (
    <CartContext.Provider value={{ cart, setCart, openCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
