import React from "react";

function SkeletalProductList() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      <div className="h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="h-[250px] rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
}

export default SkeletalProductList;
