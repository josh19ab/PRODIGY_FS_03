import React from "react";

function SkeletalProductList() {
  return (
    <div className="flex  gap-5">
      <div className="w-[400px] h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[400px] h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[400px] h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[400px] h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      
    </div>
  );
}

export default SkeletalProductList;
