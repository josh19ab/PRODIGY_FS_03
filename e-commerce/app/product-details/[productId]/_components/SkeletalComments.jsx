import React from "react";

function SkeletalComment() {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="w-[300px] md:w-[600px] h-[60px] rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-[300px] md:w-[600px] h-[60px] rounded-lg bg-slate-300 animate-pulse"></div>
      
      
    </div>
  );
}

export default SkeletalComment;