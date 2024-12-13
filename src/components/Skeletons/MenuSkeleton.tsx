import React from "react";

const MenuItemSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 h-full flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-52 bg-gray-200"></div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Package contents skeleton */}
        <div className="flex-grow">
          <div className="space-y-2">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-gray-200 mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Price and button skeleton */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-end justify-between">
            <div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-9 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuSkeleton = () => {
  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-16 mt-28">
      {/* Title and subtitle skeleton */}
      <div className="flex flex-col items-center mb-10">
        <div className="h-10 bg-gray-200 rounded w-64 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <MenuItemSkeleton key={index} />
        ))}
      </div>

      {/* Bottom info box skeleton */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
};

export default MenuSkeleton; 