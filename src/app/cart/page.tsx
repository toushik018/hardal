"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetCartQuery,
  useEditProductMutation,
  useRemoveProductMutation,
  useDeletePackageMutation,
} from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ShoppingCart, Trash2 } from "lucide-react";
import {
  CartSkeleton,
} from "@/components/Skeletons/CartSkeleton";
import { CartPackage } from "@/components/Cart/CartPackage";
import { handleError } from "@/components/Cart/utils";
import { CartProduct, LoadingState } from "@/types/types";

interface CategoryProducts {
  [key: string]: CartProduct[];
}

interface PackageOrder {
  package: string;
  price: number;
  products: CategoryProducts;
}

interface MenuContent {
  name: string;
  ids: number[];
  count: number;
}

const Cart: React.FC = () => {
  const router = useRouter();
  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
    refetch,
  } = useGetCartQuery();
  const [editProduct] = useEditProductMutation();
  const [removeProduct] = useRemoveProductMutation();
  const [deletePackage] = useDeletePackageMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const cartItems = useMemo(() => {
    if (!cartData?.cart?.order || !Array.isArray(cartData.cart.order)) {
      return [];
    }

    try {
      return cartData.cart.order.flatMap((pkg: PackageOrder) => {
        if (!pkg || typeof pkg !== "object") return [];

        const allProducts: CartProduct[] = [];

        const categoryMap = new Map<string, string>();

        if (cartData?.cart?.menu?.contents) {
          cartData.cart.menu.contents.forEach((content: MenuContent) => {
            if (content?.ids?.[0] !== undefined) {
              categoryMap.set(content.ids[0].toString(), content.name);
            }
          });
        }

        if (pkg.products && typeof pkg.products === "object") {
          Object.entries(pkg.products).forEach(([categoryId, products]) => {
            if (Array.isArray(products)) {
              products.forEach((product: CartProduct) => {
                if (product && typeof product === "object") {
                  const extendedProduct: CartProduct = {
                    ...product,
                    category_name: categoryMap.get(categoryId) || "Andere",
                    package_name: pkg.package || "Unbekanntes Paket",
                    package_price:
                      typeof pkg.price === "number" ? pkg.price : 0,
                  };
                  allProducts.push(extendedProduct);
                }
              });
            }
          });
        }

        return allProducts;
      });
    } catch (error) {
      console.error("Error processing cart items:", error);
      return [];
    }
  }, [cartData]);

  const { subTotal, totalPrice } = useMemo(() => {
    try {
      const totalItem = cartData?.totals?.find(
        (item: { title: string }) => item.title === "Total"
      );
      const subTotalItem = cartData?.totals?.find(
        (item: { title: string }) => item.title === "Sub-Total"
      );

      return {
        subTotal: subTotalItem?.text || "0.00€",
        totalPrice: totalItem?.text || "0.00€",
      };
    } catch (error) {
      console.error("Error calculating totals:", error);
      return { subTotal: "0.00€", totalPrice: "0.00€" };
    }
  }, [cartData]);

  const handleIncrement = async (item: CartProduct) => {
    if (!item?.cart_id) {
      toast.error("Ungültiges Produkt");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [item.cart_id]: true }));

    try {
      const newQuantity = Number(item.quantity) + 1;
      if (isNaN(newQuantity)) {
        throw new Error("Ungültige Menge");
      }

      const response = await editProduct({
        id: item.cart_id,
        quantity: newQuantity,
      }).unwrap();

      await refetch();

      if (response.success) {
        toast.success("Artikelmenge erhöht");
      } else {
        handleError(response, "Fehler beim Erhöhen der Artikelmenge");
      }
    } catch (error) {
      handleError(error, "Fehler beim Erhöhen der Artikelmenge");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [item.cart_id]: false }));
    }
  };

  const handleDecrement = async (item: CartProduct) => {
    if (Number(item.quantity) > 1) {
      try {
        const newQuantity = Number(item.quantity) - 1;
        const response = await editProduct({
          id: item.cart_id,
          quantity: newQuantity,
        }).unwrap();
        await refetch();

        if (response.success) {
          toast.success("Artikelmenge verringert");
        } else {
          toast.error("Fehler beim Verringern der Artikelmenge");
        }
      } catch (error: any) {
        toast.error(
          error.data?.message || "Fehler beim Verringern der Artikelmenge"
        );
      }
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = async (item: CartProduct) => {
    try {
      const response = await removeProduct({
        id: item.cart_id,
        quantity: 0,
      }).unwrap();
      await refetch();

      if (response.success) {
        toast.success(response.message || "Artikel aus dem Warenkorb entfernt");
      } else {
        toast.error(response.message || "Fehler beim Entfernen des Artikels");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Fehler beim Entfernen des Artikels");
    }
  };

  const handleCancelOrder = async () => {
    setIsConfirmingCancel(true);
    try {
      await deletePackage().unwrap();
      toast.success("Bestellung erfolgreich storniert");
      router.push("/");
    } catch (error) {
      toast.error("Fehler beim Stornieren der Bestellung");
      setIsConfirmingCancel(false);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/checkout");
    } catch (error) {
      toast.error("Fehler beim Weiterleiten zur Kasse");
      setIsProcessing(false);
    }
  };

  if (isCartLoading) {
    return (
      <div className="min-h-screen py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <CartSkeleton />
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-500 mb-2">
            Fehler beim Laden des Warenkorbs
          </h2>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-first text-black rounded-xl hover:bg-first/90 transition-all"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-first/5 rounded-lg shadow-md p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="mr-2 h-10 w-10" />
              Ihr Warenkorb
            </h1>
            {cartItems.length > 0 && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Sind Sie sicher, dass Sie die gesamte Bestellung stornieren möchten?"
                    )
                  ) {
                    handleCancelOrder();
                  }
                }}
                disabled={isConfirmingCancel}
                className={`flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors px-4 py-2 rounded-xl bg-red-100 ${
                  isConfirmingCancel ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isConfirmingCancel ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    Stornieren...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Bestellung stornieren
                  </>
                )}
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600 mb-6">
                Ihr Warenkorb ist leer
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-first rounded-xl font-medium 
                       text-gray-900 hover:bg-first/90 transition-colors 
                       duration-200 items-center justify-center gap-2"
              >
                Menü durchsuchen
              </Link>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {cartData?.cart?.order?.map(
                  (pkg: PackageOrder, index: number) => (
                    <motion.div
                      key={`${pkg.package}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CartPackage
                        pkg={pkg}
                        cartData={cartData}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onRemove={handleRemove}
                        loadingStates={loadingStates}
                      />
                    </motion.div>
                  )
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex flex-col md:flex-row justify-between items-center"
              >
                <div className="text-xl font-bold text-gray-800 mb-4 md:mb-0 space-y-2">
                  <div>
                    Zwischensumme:{" "}
                    <span className="text-first">{subTotal}</span>
                  </div>
                  <div>
                    Gesamt: <span className="text-first">{totalPrice}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel the entire order?"
                        )
                      ) {
                        handleCancelOrder();
                      }
                    }}
                    disabled={isConfirmingCancel}
                    className={`px-6 py-3 text-red-600 hover:text-red-700 font-semibold transition-colors ${
                      isConfirmingCancel ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isConfirmingCancel
                      ? "Stornieren..."
                      : "Bestellung stornieren"}
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className={`inline-block bg-first hover:bg-first/80 text-white px-8 py-3 rounded-[8px] font-semibold transition-all hover:shadow-lg transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-none disabled:opacity-75 ${
                      isProcessing ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 rounded-xl border-white border-t-transparent animate-spin"></div>
                        <span>Verarbeiten...</span>
                      </div>
                    ) : (
                      "Zur Kasse"
                    )}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
