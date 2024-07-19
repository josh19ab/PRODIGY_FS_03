'use client'
import { SignedOut, SignIn } from "@clerk/clerk-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";

function Header() {

  const { user } = useUser();

  const [isLogin, setIsLogin] = useState();

  const {cart, setCart} = useContext(CartContext);

  const [openCart,setOpenCart] = useState(false);

  useEffect(() => {
    setIsLogin(window.location.href.toString().includes('sign-in'));
    // setIsLogin(window.location.href.toString().includes('sign-up'));
  },[]);

  useEffect(() => {
    user&&getCartItem();
  },[user])

  useEffect(() => {
    openCart==false&&setOpenCart(true);
  },[cart])

  const getCartItem= () =>{
    GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then(resp => {
      const result = resp.data.data

      result&&result.forEach(prd => {
        setCart(cart => [...cart,
          {
            id:prd.id,
            product:prd.attributes.products.data[0]
          }
        ])
      })
    })
  }

  return !isLogin &&(
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between shadow-sm">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Image src="/logo.svg" alt="logo" width={90} height={100} />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 hover:text cursor-pointer"
                    href={"/sign-in"}
                  >
                    Login
                  </a>
                  <div className="hidden sm:flex">
                    <a
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-blue-800/75 sm:block"
                      href={"/sign-up"}
                    >
                      Register
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <h2 className="flex gap-1 items-center cursor-pointer"
                  onClick={()=> setOpenCart(!openCart)}
                  >
                    <ShoppingCart />
                    ({cart?.length})
                  </h2>
                  <UserButton />
                </div>
              )}

              {openCart&&<Cart />}

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    
  );
}

export default Header;
