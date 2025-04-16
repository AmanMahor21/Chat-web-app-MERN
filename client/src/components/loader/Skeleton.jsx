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

// const Skeleton = () => {
//   return (
//     <div className="relative">
//       <div className="flex items-center hover:bg-cyan-900 px-4 py-2 animate-pulse">
//         {/* Avatar + Status Dot */}
//         <div className="relative w-12 h-12">
//           <div className="w-12 h-12 bg-gray-300 rounded-full" />
//           <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
//         </div>

//         {/* Username + Last Message */}
//         <div className="flex justify-between items-center flex-1 pl-4 pr-2 py-1">
//           <div className="flex flex-col justify-between items-start w-full">
//             <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
//             <div className="h-3 bg-gray-200 rounded w-44 md:w-60 lg:w-72" />
//           </div>

//           {/* Time + Unread Badge */}
//           <div className="flex flex-col justify-between items-end gap-2 pl-4">
//             <div className="w-10 h-3 bg-gray-200 rounded" />
//             <div className="w-6 h-6 rounded-full bg-gray-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Skeleton;
