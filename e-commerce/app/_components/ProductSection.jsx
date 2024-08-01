"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { ArrowRight } from "lucide-react";
import SkeletalProductList from "./SkeletalProductsList";

function ProductSection() {
  const [productList, setProductList] = useState([]);
  const [sneakerList, setSneakerList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const resp = await GlobalApi.getLatestProducts();
      const data = resp.data.data;
      setProductList(data);

      // Adding filter for sneakers and outfits
      const sneakers = data.filter(
        (item) => item.attributes.category === "sneakers"
      );

      const outfits = data.filter(
        (item) => item.attributes.category === "tshirts"
      );
      setSneakerList(sneakers);
      setOutfitList(outfits);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    productList && (
      <div className="px-10 md:px-20">
        {/* Latest Products */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px] text-gray-900 ">
            New Arrivals
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-primary dark:text-blue-300">See Collection</h2>
            <ArrowRight className="text-primary dark:text-blue-300 w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={productList} />
          )}
        </div>

        {/* Sneakers  */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px] text-gray-900 ">
            Sneakers
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-primary dark:text-blue-300">See Collection</h2>
            <ArrowRight className="text-primary dark:text-blue-300 w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={sneakerList} />
          )}
        </div>

        {/* Outfits */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px] text-gray-900 ">
            T Shirts
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-primary dark:text-blue-300">See Collection</h2>
            <ArrowRight className="text-primary dark:text-blue-300 w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={outfitList} />
          )}
        </div>
      </div>
    )
  );
}

export default ProductSection;
