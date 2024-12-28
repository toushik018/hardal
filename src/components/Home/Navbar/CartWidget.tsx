"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

const CartWidget = () => {
  const { data: cartData, isLoading } = useGetCartQuery();

  const getTotalItems = (): number => {
    if (!cartData?.products) return 0;
    return cartData.products.reduce(
      (total: number, item: { quantity: string }) => {
        const quantity = Number(item.quantity);
        return total + (isNaN(quantity) ? 0 : quantity);
      },
      0
    );
  };

  const getTotalPrice = (): string => {
    try {
      let calculatedTotal = 0;

      // Process each package
      if (cartData?.cart?.order) {
        const packages = Array.isArray(cartData.cart.order)
          ? cartData.cart.order
          : Object.values(cartData.cart.order);

        packages.forEach((pkg: any) => {
          // Base package price = package price * number of guests
          const basePackagePrice = pkg.price * (pkg.guests || 1);

          // Calculate extras total
          let extrasTotal = 0;
          Object.values(pkg.products).forEach((products: any) => {
            products.forEach((product: any) => {
              // Check if it's an extra: quantity is 10 and has a price
              if (Number(product.quantity) === 10 && product.price > 0) {
                extrasTotal += product.total;
              }
            });
          });

          // Add this package's total to the overall total
          calculatedTotal += basePackagePrice + extrasTotal;
        });
      }

      return calculatedTotal.toFixed(2);
    } catch (error) {
      console.error("Error calculating total:", error);
      return "0.00";
    }
  };

  return (
    <Link href="/cart" className="relative group">
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <ShoppingBag
            className="h-[22px] w-[22px] text-gray-700 group-hover:text-first transition-colors"
            strokeWidth={1.5}
          />
          <AnimatePresence mode="wait">
            {!isLoading && getTotalItems() > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-2 -right-2 bg-first text-[#0A2533] 
                         text-xs font-medium h-5 min-w-[20px] rounded-full
                         flex items-center justify-center shadow-sm
                         border-2 border-white"
              >
                {getTotalItems()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Display */}
        <div className="hidden lg:block">
          {isLoading ? (
            <div className="h-5 w-16 bg-gray-100 animate-pulse rounded" />
          ) : (
            <span className="font-medium text-gray-700">
              {getTotalPrice()}
              <span className="text-gray-400 ml-1">€</span>
            </span>
          )}
        </div>

        {/* Mobile Price Tooltip */}
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 lg:hidden"
            >
              <div
                className="bg-white rounded-lg shadow-lg py-2 px-4 border border-gray-100
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <div className="text-sm whitespace-nowrap">
                  <p className="text-gray-500 font-medium mb-1">
                    {getTotalItems()} Produkte
                  </p>
                  <p className="text-gray-700 font-semibold">
                    {getTotalPrice()}
                    <span className="text-gray-400 ml-1">€</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default CartWidget;
