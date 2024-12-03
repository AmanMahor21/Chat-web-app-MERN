import React from "react";

const Skeleton = () => {
  return (
    <div class="space-y-7 p-4 max-w-md">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="flex-1 space-y-2">
          <div class="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="flex-1 space-y-2">
          <div class="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="flex-1 space-y-2">
          <div class="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
