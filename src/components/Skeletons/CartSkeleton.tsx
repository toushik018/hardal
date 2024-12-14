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

const CartSkeleton = () => {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-first/5 rounded-lg shadow-md p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Package Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 bg-first/20 p-4 rounded-[8px]">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Headers */}
            <div className="hidden md:grid grid-cols-5 gap-4 mb-4 pb-2 border-b">
              <div className="col-span-2 h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
            </div>

            {/* Cart Items */}
            {[1, 2, 3].map((index) => (
              <CartItemSkeleton key={index} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="space-y-2 mb-4 md:mb-0">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded-[8px] w-32"></div>
              <div className="h-12 bg-gray-200 rounded-[8px] w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
