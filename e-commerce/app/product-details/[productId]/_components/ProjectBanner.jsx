import Image from "next/image";
import React from "react";

function ProjectBanner({ product }) {
  return (
    <div className=" flex  items-center justify-around">
      {product ? (
        <Image
          src={product?.attributes?.banner?.data.attributes?.url}
          alt="banner"
          width={350}
          height={400}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="w-[350px] h-[400px] rounded-lg bg-slate-300 animate-pulse"></div>
      )}
    </div>
  );
}

export default ProjectBanner;