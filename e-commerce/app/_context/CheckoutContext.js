'use client';
import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <CheckoutContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
