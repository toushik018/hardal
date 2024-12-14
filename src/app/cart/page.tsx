"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductItem from "@/components/Products/ProductItem";
import Loading from "@/components/Loading/Loading";
import {
  useGetCartQuery,
  useEditProductMutation,
  useRemoveProductMutation,
  useGetProductByIdQuery,
  useDeletePackageMutation,
} from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartItemSkeleton, CartSkeleton } from "@/components/Skeletons";
import { ShoppingCart, Trash2 } from "lucide-react";
interface PackageProduct {
  cart_id: string;
  product_id: string;
  name: string;
  image: string;
  quantity: string;
  price: number;
  total: number;
}

interface PackageOrder {
  package: string;
  price: number;
  products: PackageProduct[];
}

const CartItemWithDetails: React.FC<{
  item: PackageProduct;
  onIncrement: (item: PackageProduct) => void;
  onDecrement: (item: PackageProduct) => void;
  onRemove: (item: PackageProduct) => void;
}> = ({ item, onIncrement, onDecrement, onRemove }) => {
  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductByIdQuery(item.product_id.toString());

  if (isLoading) {
    return <CartItemSkeleton />;
  }

  if (
    error ||
    !productDetails ||
    !productDetails.products ||
    productDetails.products.length === 0
  ) {
    return (
      <div className="flex justify-start items-center py-4 text-red-500">
        Fehler beim Laden der Produkt-Details. Bitte versuchen Sie es später
        erneut.
      </div>
    );
  }

  // Transform package product to match ProductItem interface
  const productForItem = {
    product_id: parseInt(item.product_id),
    name: item.name,
    thumb: item.image,
    price: item.price,
    quantity: parseInt(item.quantity),
    leadTime: productDetails.products[0].leadTime,
  };

  return (
    <ProductItem
      product={productForItem}
      onIncrement={() => onIncrement(item)}
      onDecrement={() => onDecrement(item)}
      onRemove={() => onRemove(item)}
    />
  );
};

const Cart: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
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
  // Get all products from packages with proper type checking
  const cartItems = useMemo(() => {
    // Ensure packages is always an array
    const packages = Array.isArray(cartData?.cart?.order)
      ? cartData.cart.order
      : [];
    // Only proceed with flatMap if we have packages
    const allProducts = packages.flatMap((pkg: PackageOrder) =>
      pkg.products.map((product: PackageProduct) => ({
        ...product,
        package_name: pkg.package,
        package_price: pkg.price,
        price: product.price.toString(),
      }))
    );
    return allProducts;
  }, [cartData]);

  const { subTotal, totalPrice } = useMemo(() => {
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
  }, [cartData]);

  const handleIncrement = async (item: PackageProduct) => {
    try {
      const newQuantity = Number(item.quantity) + 1;
      const response = await editProduct({
        id: item.cart_id,
        quantity: newQuantity,
      }).unwrap();
      await refetch();
      console.log(response.success);
      if (response.success) {
        toast.success("Artikelmenge erhöht");
      } else {
        toast.error("Fehler beim Erhöhen der Artikelmenge");
      }
    } catch (error: any) {
      toast.error(
        error.data?.message || "Fehler beim Erhöhen der Artikelmenge"
      );
    }
  };

  const handleDecrement = async (item: PackageProduct) => {
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

  const handleRemove = async (item: PackageProduct) => {
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
      // Add any pre-checkout validation here if needed
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Optional: simulate processing
      router.push("/checkout");
    } catch (error) {
      toast.error("Fehler beim Weiterleiten zur Kasse");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (isLoading || isCartLoading) {
    return <CartSkeleton />;
  }

  if (cartError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-500 mb-2">
            Fehler beim Laden der Warenkorb-Daten
          </h2>
          <button 
            onClick={() => refetch()}
            className="text-first hover:text-first/80"
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
              <p className="text-xl text-gray-600 mb-6">Ihr Warenkorb ist leer</p>
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
                {cartData?.cart?.order?.map((pkg: PackageOrder, index: number) => (
                  <motion.div
                    key={`${pkg.package}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4 bg-first/20 p-4 rounded-[8px]">
                        <h2 className="text-xl font-semibold text-gray-800 ">
                          {pkg.package}
                        </h2>
                        <span className="text-lg font-bold text-gray-800">
                          {pkg.price}€
                        </span>
                      </div>

                      <div className="hidden md:grid grid-cols-5 gap-4 mb-4 font-semibold text-gray-700 border-b pb-2">
                        <div className="col-span-2">Produkt</div>
                        <div className="text-center">Preis</div>
                        <div className="text-center">Menge</div>
                        <div className="text-right">Gesamt</div>
                      </div>

                      {pkg.products.map((item: PackageProduct) => (
                        <CartItemWithDetails
                          key={item.cart_id}
                          item={item}
                          onIncrement={handleIncrement}
                          onDecrement={handleDecrement}
                          onRemove={handleRemove}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex flex-col md:flex-row justify-between items-center"
              >
                <div className="text-xl font-bold text-gray-800 mb-4 md:mb-0 space-y-2">
                  <div>
                    Zwischensumme: <span className="text-first">{subTotal}</span>
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
                    {isConfirmingCancel ? "Stornieren..." : "Bestellung stornieren"}
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
