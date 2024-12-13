import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useGetCartQuery } from "@/services/api";

const CartWidget = () => {
  const { data: cartData, isLoading, error } = useGetCartQuery();

  const getTotalItems = (): number => {
    if (!cartData || !cartData.products) return 0;

    return cartData.products.reduce((total: number, item: { quantity: any }) => {
      const quantity = Number(item.quantity);
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
  };

  const getTotalPrice = (): string => {
    if (!cartData || !cartData.totals) return "0.00";

    const totalItem = cartData.totals.find((item: { title: string }) => item.title === "Total");
    if (!totalItem) return "0.00";

    const numericValue = totalItem.text.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue).toFixed(2);
  };

  return (
    <Link href="/cart" className="relative group flex items-center ml-6">
      <div className="bg-green-600 p-0.5 rounded-full">
        <div className="bg-white dark:bg-gray-900 rounded-full p-2 transition-all duration-300 group-hover:bg-opacity-0">
          <ShoppingCart className="h-6 w-6 text-green-500 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
      {!isLoading && getTotalItems() > 0 && (
        <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {getTotalItems()}
        </span>
      )}
      <div className="ml-2 hidden lg:block">
        {isLoading ? (
          <div className="flex items-center">
            <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="text-sm font-medium">
            <span className="text-green-500">{getTotalPrice()} €</span>
          </div>
        )}
      </div>
      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none lg:hidden">
        {isLoading ? (
          <div className="flex flex-col gap-1 min-w-[80px]">
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="text-sm font-medium w-full flex flex-col">
            <span className="text-gray-600 whitespace-nowrap">
              {getTotalItems()} Produkte
            </span>
            <span className="text-green-500 whitespace-nowrap">
              {getTotalPrice()} €
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartWidget;
