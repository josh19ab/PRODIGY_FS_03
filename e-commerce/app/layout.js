"use client";

import { Mukta } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartContext } from "./_context/CartContext"; 
import { useEffect, useState } from "react";
import { CheckoutProvider } from "./_context/CheckoutContext";

const mukta = Mukta({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]); // Initialize cart state
  const [openCart, setOpenCart] = useState(false); // State to manage cart visibility

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const toggleCart = () => {
    setOpenCart((prev) => !prev); // Toggle cart visibility
  };

  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart, openCart, toggleCart }}>
        <CheckoutProvider>
          <html lang="en">
            <body className={mukta.className}>
              <Header toggleDarkMode={toggleDarkMode} />
              {children}
              <Footer toggleDarkMode={toggleDarkMode} />
            </body>
          </html>
        </CheckoutProvider>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
