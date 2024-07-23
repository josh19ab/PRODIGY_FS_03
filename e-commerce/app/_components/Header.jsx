import React, { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { CartContext } from "../_context/CartContext";
import DarkMode from "./DarkMode";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";
import { usePathname } from "next/navigation";

function Header() {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState();
  const { cart, openCart, toggleCart, setCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  const hideHeader = path === "/sign-in" || path === "/sign-up";

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

  const getCartItem = async () => {
    try {
      const resp = await GlobalApi.getUserCartItems(
        user.primaryEmailAddress.emailAddress
      );
      const result = resp.data.data;

      if (result) {
        const newCartItems = result.map((prd) => ({
          id: prd.id,
          product: prd.attributes.products.data[0],
        }));
        setCart(newCartItems);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  if (hideHeader) return null;

  return (
    <div>
      <header id="header">
        <div className=" bg-gray-50 mx-auto  px-4 sm:px-6 lg:px-8 p-2">
          <div className="flex h-16 items-center justify-between  text-gray-900 dark:text-light">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a href="/">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={60}
                  height={40}
                  id="logo"
                />
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav
                aria-label="Global"
                className={`absolute right-3 z-10 bg-gray-50 border border-darkAccent md:border-none
                  md:text-light    shadow-md md:static md:block md:p-0 md:shadow-none px-10 py-10  md:mt-0 mt-14 rounded-md ${
                    isMenuOpen
                      ? "animate-slide-in-right block"
                      : "animate-slide-out-right hidden"
                  }`}
              >
                <ul className="flex flex-col items-start gap-4 text-md md:flex-row md:items-center md:gap-6 dark:text-dark">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/explore"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/cart"
                    >
                      Cart
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/orders"
                    >
                      Orders
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <DarkMode />
                {!user ? (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-darkAccent"
                      href="/sign-in"
                    >
                      Login
                    </a>
                    <a
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-darkAccent sm:block"
                      href="/sign-up"
                    >
                      Register
                    </a>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    <h2
                      className="flex gap-1 items-center cursor-pointer text-gray-900 "
                      onClick={toggleCart}
                    >
                      <ShoppingCart />({cart ? cart.length : 0})
                    </h2>
                    <UserButton />
                  </div>
                )}
                {openCart && <Cart />}
                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-900  transition hover:bg-gray-200 "
                    onClick={toggleMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {isMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
