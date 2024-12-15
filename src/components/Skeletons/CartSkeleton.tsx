import React from "react";

export const CartItemSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center py-4 border-b animate-pulse">
      <div className="col-span-2 flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
      </div>
      <div className="text-right">
        <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
      </div>
    </div>
  );
};

export const CartSkeleton = () => {
  return (
    <div className="bg-first/5 rounded-lg shadow-md p-6 md:p-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-2" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Package */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded-[8px]">
          <div className="h-6 w-32 bg-gray-300 rounded" />
          <div className="h-6 w-16 bg-gray-300 rounded" />
        </div>

        {/* Products */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="grid grid-cols-5 gap-4 items-center py-4 border-b"
          >
            <div className="col-span-2 flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-md" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
            <div className="h-8 w-24 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-2 mb-4 md:mb-0">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-gray-200 rounded" />
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

