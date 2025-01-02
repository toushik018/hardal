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

import { ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { CartSkeleton } from "@/components/Skeletons/CartSkeleton";
import { CartPackage } from "@/components/Cart/CartPackage";
import { handleError } from "@/components/Cart/utils";
import { CartProduct, LoadingState } from "@/types/types";
import { getPackageMenuId } from "@/utils/menuUtils";
import { getMenuContents } from "@/constants/categories";
import {
  calculateExtrasTotal,
  calculateTotals,
  formatExtrasTotal,
} from "@/components/Cart/CartPriceCalculation";

interface CategoryProducts {
  [key: string]: CartProduct[];
}

interface PackageOrder {
  id: string;
  package: string;
  price: number;
  products: CategoryProducts;
  guests?: number;
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();
  const [deletingPackageId, setDeletingPackageId] = useState<string | null>(
    null
  );
  const cartItems = useMemo(() => {
    if (!cartData?.cart?.order) {
      return [];
    }

    try {
      // Convert order to array if it's an object
      const orderArray = Array.isArray(cartData.cart.order)
        ? cartData.cart.order
        : Object.values(cartData.cart.order);

      return orderArray
        .map((pkg: PackageOrder) => {
          if (!pkg || typeof pkg !== "object") return null;

          const allProducts: CartProduct[] = [];
          const categoryMap = new Map<string, string>();

          // If menu exists, use it to map all category IDs
          if (cartData?.cart?.menu?.contents) {
            cartData.cart.menu.contents.forEach((content: MenuContent) => {
              content.ids.forEach((id) => {
                categoryMap.set(id.toString(), content.name);
              });
            });
          }

          // Process all products in the package
          if (pkg.products && typeof pkg.products === "object") {
            Object.entries(pkg.products).forEach(([categoryId, products]) => {
              if (Array.isArray(products)) {
                products.forEach((product: CartProduct) => {
                  if (product && typeof product === "object") {
                    const categoryName =
                      categoryMap.get(categoryId) || "Andere";

                    const extendedProduct: CartProduct = {
                      ...product,
                      category_name: categoryName,
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

          // Group products by category for display
          const groupedProducts = allProducts.reduce((acc, product) => {
            const category = product.category_name || "Andere";
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(product);
            return acc;
          }, {} as { [key: string]: CartProduct[] });

          return {
            ...pkg,
            groupedProducts,
            products: allProducts,
            guests: pkg.guests,
          };
        })
        .filter(Boolean);
    } catch (error) {
      console.error("Error processing cart items:", error);
      return [];
    }
  }, [cartData]);

  // Calculate extras total first
  const extrasTotal = useMemo(() => calculateExtrasTotal(cartData), [cartData]);

  // Format the extras total for display
  const formattedExtrasTotal = useMemo(
    () => formatExtrasTotal(extrasTotal),
    [extrasTotal]
  );

  // Then calculate subtotal and total
  const { subTotal, totalPrice } = useMemo(
    () => calculateTotals(cartData, extrasTotal),
    [cartData, extrasTotal]
  );

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

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Format cart data for checkout
      const formattedPackages = Array.isArray(cartData?.cart?.order)
        ? cartData.cart.order
        : Object.values(cartData?.cart?.order || {});

      // Make sure guest counts are included in the packages
      const packagesWithGuests = formattedPackages.map((pkg: any) => ({
        ...pkg,
        guests: pkg.guests || null,
      }));

      // Store the formatted data for use in checkout
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          packages: packagesWithGuests,
          totals: cartData?.totals,
        })
      );

      router.push("/checkout");
    } catch (error) {
      toast.error("Fehler beim Weiterleiten zum Auftrag");
      setIsProcessing(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Möchten Sie wirklich den gesamten Warenkorb leeren?")) {
      try {
        await deletePackage({}).unwrap();
        toast.success("Warenkorb wurde erfolgreich geleert");
      } catch (error) {
        toast.error("Fehler beim Leeren des Warenkorbs");
      }
    }
  };

  const handleDeletePackage = async (
    packageId: string,
    packageName: string
  ) => {
    try {
      setDeletingPackageId(packageId);
      await deletePackage({ id: packageId }).unwrap();
      toast.success(`${packageName} wurde erfolgreich entfernt`);
      await refetch(); // Refetch cart data after deletion
    } catch (error) {
      toast.error("Fehler beim Entfernen des Pakets");
      console.error("Error deleting package:", error);
    } finally {
      setDeletingPackageId(null);
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
                onClick={handleClearCart}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 text-red-600 
                         bg-red-50 hover:bg-red-100 rounded-xl transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Wird geleert...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5" />
                    <span>Warenkorb leeren</span>
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
                {Array.isArray(cartData?.cart?.order)
                  ? cartData.cart.order.map(
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
                            isDeleting={
                              isDeleting && deletingPackageId === pkg.id
                            }
                            handleDeletePackage={() =>
                              handleDeletePackage(pkg.id!, pkg.package)
                            }
                          />
                        </motion.div>
                      )
                    )
                  : Object.values(cartData?.cart?.order || {}).map(
                      (pkg, index) => {
                        const packageOrder = pkg as PackageOrder;
                        return (
                          <motion.div
                            key={`${packageOrder.package}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <CartPackage
                              pkg={packageOrder}
                              cartData={cartData}
                              onIncrement={handleIncrement}
                              onDecrement={handleDecrement}
                              onRemove={handleRemove}
                              loadingStates={loadingStates}
                              isDeleting={
                                isDeleting &&
                                deletingPackageId === packageOrder.id
                              }
                              handleDeletePackage={() =>
                                handleDeletePackage(
                                  packageOrder.id!,
                                  packageOrder.package
                                )
                              }
                            />
                          </motion.div>
                        );
                      }
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
                    Extras:{" "}
                    <span className="text-first">{formattedExtrasTotal}</span>
                  </div>
                  <div>
                    Gesamt: <span className="text-first">{totalPrice}</span>
                  </div>
                </div>
                <Link
                  href="/#menu-section"
                  className="inline-block bg-second hover:bg-second/80 text-white px-8 py-3 rounded-[8px] font-semibold transition-all hover:shadow-lg transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-none disabled:opacity-75"
                >
                  Zurück zu den Menüs
                </Link>
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
                    "Auftrag erstellen"
                  )}
                </button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
