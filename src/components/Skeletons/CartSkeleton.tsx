import React from "react";

export const CartItemSkeleton = () => {
  return (
    <div className="border-b border-gray-100 py-4 animate-pulse">
      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 items-center">
        {/* Product Image & Name */}
        <div className="md:col-span-2 flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        {/* Price - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-center items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-10 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>

        {/* Total - Hidden on mobile */}
        <div className="hidden md:block text-right">
          <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

const CartSkeleton = () => {
  return (
    <div className="min-h-screen py-28 px-4 md:px-8">
      <div className="lg:container w-full mx-auto">
        <div className="bg-green-50 rounded-2xl shadow-md p-6 md:p-8">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-40 mb-8"></div>

          {/* Headers */}
          <div className="hidden md:grid grid-cols-5 gap-4 mb-4 pb-2 border-b">
            <div className="col-span-2 h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
          </div>

          {/* Cart Items */}
          {[1, 2, 3].map((index) => (
            <CartItemSkeleton key={index} />
          ))}

          {/* Totals and Checkout Button */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="space-y-4 mb-6 md:mb-0">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-full w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
