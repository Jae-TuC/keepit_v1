import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-x-2 items-center">
          <div className="flex items-center r-2">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <Skeleton className="w-full h-[20px] rounded-lg" />
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
