import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartSummaryProps {
  cartData: any;
  currentCategory: {
    name?: string;
    count?: number;
  };
  getCurrentCategoryCount: () => number;
  activeStep: number;
  menuContents: any[];
  onPrevious: () => void;
  onNext: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartData,
  currentCategory,
  getCurrentCategoryCount,
  activeStep,
  menuContents,
  onPrevious,
  onNext,
}) => {

    
  // Group products by their categories for better organization
//   const groupedProducts = menuContents
//     .slice(0, activeStep + 1)
//     .map((category) => ({
//       name: category.name,
//       count: category.count,
//       currentCount:
//         cartData?.cart?.menu?.contents?.find(
//           (c: any) => c.name === category.name
//         )?.currentCount || 0,
//     }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:w-[650px] w-full sticky top-[90px]"
    >
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>

          {/* Categories Progress */}
          {/* <div className="mb-6 space-y-4">
            <AnimatePresence mode="wait">
              {groupedProducts.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[15px] font-medium text-gray-800">
                      {category.name}
                    </h3>
                    <span
                      className={`text-sm font-medium ${
                        category.currentCount >= category.count
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {category.currentCount}/{category.count}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div> */}

          {/* Selected Products List */}
          <div className="space-y-3 mb-6">
            <AnimatePresence mode="popLayout">
              {cartData?.products?.map((product: any) => (
                <motion.div
                  key={product.cart_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex justify-between items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">
                        × {product.quantity}
                      </span>
                      {product.price !== "0.00€" && (
                        <span className="text-sm text-gray-600">
                          {product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 mb-6">
            {cartData?.totals?.map((total: any, index: number) => (
              <div
                key={total.title}
                className={`flex justify-between items-center ${
                  index !== cartData.totals.length - 1 ? "mb-2" : "mt-3"
                }`}
              >
                <span
                  className={`${
                    index === cartData.totals.length - 1
                      ? "font-bold text-base"
                      : "text-sm text-gray-600"
                  }`}
                >
                  {total.title}
                </span>
                <span
                  className={`${
                    index === cartData.totals.length - 1
                      ? "font-bold text-base"
                      : "text-sm text-gray-600"
                  }`}
                >
                  {total.text}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onPrevious}
              disabled={activeStep === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 rounded-xl text-gray-900 font-medium hover:bg-yellow-500 transition-colors"
            >
              <span>
                {activeStep === menuContents.length - 1
                  ? "Zur Kasse"
                  : "Weiter"}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
