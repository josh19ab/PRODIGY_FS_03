import React from "react";

function SkeletalProjectInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-[300px] md:w-[400px] h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[70px] h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[300px] md:w-[400px] h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[300px] md:w-[400px]  h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[300px] md:w-[400px] h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[100px] h-[20px] rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
}

export default SkeletalProjectInfo;