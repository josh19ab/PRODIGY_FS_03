import React from "react";

function SkeletalOrder() {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="w-full h-[60px] rounded-lg shadow-sm bg-slate-200 animate-pulse"></div>
      <div className="w-full h-[60px] rounded-lg shadow-sm bg-slate-200 animate-pulse delay-150"></div>
      <div className="w-full h-[60px] rounded-lg shadow-sm bg-slate-200 animate-pulse delay-300"></div>
    </div>
  );
}

export default SkeletalOrder;
