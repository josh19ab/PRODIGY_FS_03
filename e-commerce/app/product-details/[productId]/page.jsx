"use client";

import Breadcrumb from "@/app/_components/Breadcrumb";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import ProjectBanner from "./_components/ProjectBanner";
import ProjectInfo from "./_components/ProjectInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

function ProductDetails({ params }) {

  const [productDetail, setProductDetails] = useState();
  const [productList, setProductList] = useState([]);
  const path = usePathname();

  useEffect(() => {
    params?.productId && getProductById();
  }, [params?.productId]);

  const getProductById = () => {
    GlobalApi.getProductsById(params?.productId).then((resp) => {
      setProductDetails(resp.data.data);
      getProductListByCategory(resp.data.data);
    });
  };

  const getProductListByCategory = (product) => {
    GlobalApi.getProductListByCategory(
      product?.attributes?.category
    ).then(resp => {
      setProductList(resp.data.data);
    });
  };
  return (
    <div className="p-5 py-12 px-10 md:px-28">
      <Breadcrumb path={path} />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 sm:gap-10">
        <ProjectBanner product={productDetail} />
        <ProjectInfo product={productDetail} />
      </div>
      {productList&& <div className="mt-20">
        <h2 className="font-medium text-[20px] mb-4">Similar Products</h2>
        <ProductList productList={productList} />
      </div>}
    </div>
  );
}

export default ProductDetails;
