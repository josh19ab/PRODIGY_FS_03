"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { ArrowRight } from "lucide-react";

function ProductSection() {
  const [productList, setProductList] = useState([]);
  const [sneakerList, setSneakerList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts().then((resp) => {
      console.log(resp.data.data);
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
    });
  };

  return (
    productList && (
      <div className="px-10 md:px-20">
        {/* Latest Products */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px]">New Arrivals</h2>
          <div className="flex cursor-pointer">
            <h2 className="text-[14px] text-primary">See Collection</h2>
            <ArrowRight className="text-primary w-4 h-4" />
          </div>
        </div>
        <ProductList productList={productList} />

        {/* Sneakers  */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px]">New Arrivals</h2>
          <div className="flex cursor-pointer">
            <h2 className="text-[14px] text-primary">See Collection</h2>
            <ArrowRight className="text-primary w-4 h-4" />
          </div>
        </div>
        <ProductList productList={sneakerList} />

        {/* Outfits */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold my-3 text-[20px]">New Arrivals</h2>
          <div className="flex cursor-pointer">
            <h2 className="text-[14px] text-primary">See Collection</h2>
            <ArrowRight className="text-primary w-4 h-4" />
          </div>
        </div>
        <ProductList productList={outfitList} />
      </div>
    )
  );
}

export default ProductSection;
