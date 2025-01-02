"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  calculateExtrasTotal,
  calculateTotals,
} from "@/components/Cart/CartPriceCalculation";

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

  // Calculate cart totals using our utility functions
  const extrasTotal = calculateExtrasTotal(cartData);
  const { totalPrice } = calculateTotals(cartData, extrasTotal);

  return (
    <Link href="/cart" className="relative group">
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          <AnimatePresence>
            {getTotalItems() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-first text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
              >
                {getTotalItems()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Display */}
        <div className="text-sm font-medium">
          {isLoading ? (
            <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
          ) : (
            totalPrice
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartWidget;
