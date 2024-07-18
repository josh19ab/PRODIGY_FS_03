import { AlertOctagon, BadgeCheck, IndianRupee } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";
import React from "react";

function ProjectInfo({ product }) {
  return (
    <div>
      <h2 className="text-[20px]">{product?.attributes?.title}</h2>
      <h2 className="text-[15px] text-gray-400">
        {product?.attributes?.category}
      </h2>
      <h2 className="text-[15px] mt-5 text-gray-700">
        {product?.attributes?.desc}
      </h2>
      <div className="flex gap-2 mt-5 text-gray-500 text-[13px]">
        {product?.attributes?.instantDelivery ? (
          <div className="flex items-center c">
            <BadgeCheck className="text-green-500 h-5 w-5" />
            <span>Eligible For Instant Delivery</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <AlertOctagon className="text-red-500 h-5 w-5" />
            <span>Not Eligible For Instant Delivery</span>
          </div>
        )}
      </div>
      <h2 className="flex items-center font-medium text-[35px] mt-5">
        <IndianRupee className="w-5 h-5" />
        {product?.attributes?.pricing}
      </h2>
      <button className="flex gap-2 p-3 items-center bg-primary text-white rounded-lg px-10 mt-5 hover:bg-blue-700">
        <FaCartPlus />
        Add to Cart
      </button>
    </div>
  );
}

export default ProjectInfo;
