import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRemoveProductMutation } from "@/services/api";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [isLoading, setIsLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeProduct] = useRemoveProductMutation();

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await onNext();
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProduct = async (cartId: string) => {
    setRemovingId(cartId);
    try {
      await removeProduct({ id: cartId, quantity: 0 });
      toast.success("Produkt entfernt");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Fehler beim Entfernen des Produkts");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:w-[650px] w-full sticky top-[150px]"
    >
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
          <ScrollArea className="h-[300px] lg:h-[400px] mb-6">
            {(!cartData?.products || cartData.products.length === 0) ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Ihr Warenkorb ist leer
                </p>
                <p className="text-gray-500 text-sm">
                  Fügen Sie Gerichte aus unserem Menü hinzu
                </p>
              </div>
            ) : (
              <div className="space-y-3 pr-4">
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
                      <button
                        onClick={() => handleRemoveProduct(product.cart_id)}
                        disabled={removingId === product.cart_id}
                        className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200"
                      >
                        {removingId === product.cart_id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>

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

          <div className="flex gap-3">
            <button
              onClick={onPrevious}
              disabled={activeStep === 0 || isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 rounded-xl text-gray-900 font-medium hover:bg-yellow-500 transition-colors disabled:opacity-70 disabled:hover:bg-yellow-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Wird geladen...</span>
                </>
              ) : (
                <>
                  <span>
                    {activeStep === menuContents.length - 1
                      ? "Zur Kasse"
                      : "Weiter"}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
