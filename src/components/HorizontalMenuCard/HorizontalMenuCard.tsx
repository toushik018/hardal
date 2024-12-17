"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import Link from "next/link";
import {
  useAddToCartMutation,
  useEditProductMutation,
  useRemoveProductMutation,
  useGetCartQuery,
} from "@/services/api";
import { Product } from "@/types/product";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedProduct, showExtraModal, clearSelectedProduct } from "@/redux/slices/extraSlice";
import { useAddExtraMutation } from "@/services/api";

interface HorizontalMenuCardProps {
  product: Product;
  activeCategoryName: string;
}

const HorizontalMenuCard = ({
  product,
  activeCategoryName,
}: HorizontalMenuCardProps) => {
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: cartData, refetch: refetchCart } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [editProduct] = useEditProductMutation();
  const [removeProduct] = useRemoveProductMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const cartItem = cartData?.products?.find(
      (item: any) => item.product_id === product.product_id
    );
    setLocalQuantity(cartItem ? Number(cartItem.quantity) : 0);
  }, [cartData, product.product_id]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0) return;
    setIsUpdating(true);
    const toastId = toast.loading("Warenkorb aktualisieren...");
    try {
      const cartItem = cartData?.products?.find(
        (item: any) => item.product_id === product.product_id
      );
      if (newQuantity === 0 && cartItem) {
        await removeProduct({ id: cartItem.cart_id, quantity: 0 });
        toast.success("Produkt aus Warenkorb entfernt", { id: toastId });
      } else if (cartItem) {
        await editProduct({ id: cartItem.cart_id, quantity: newQuantity });
        toast.success("Menge aktualisiert", { id: toastId });
      } else if (newQuantity > 0) {
        await addToCart({ id: product.product_id, quantity: newQuantity });
        toast.success("Produkt zum Warenkorb hinzugefügt", { id: toastId });
      }
      setLocalQuantity(newQuantity);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Warenkorbs", error);
      toast.error(
        "Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.",
        { id: toastId }
      );
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
      refetchCart();
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuantity = parseInt(inputValue);
    if (!isNaN(newQuantity)) {
      handleQuantityChange(newQuantity);
    }
    setIsEditing(false);
  };

  const handleIncrement = async () => {
    setIsUpdating(true);
    const toastId = toast.loading("Warenkorb aktualisieren...");

    try {
      dispatch(setSelectedProduct({
        id: product.product_id,
        categoryName: activeCategoryName
      }));

      const newQuantity = localQuantity + 1;
      const cartItem = cartData?.products?.find(
        (item: any) => item.product_id === product.product_id
      );

      if (cartItem) {
        await editProduct({ id: cartItem.cart_id, quantity: newQuantity });
      } else {
        await addToCart({ id: product.product_id, quantity: 1 });
      }

      setLocalQuantity(newQuantity);
      toast.success("Produkt zum Warenkorb hinzugefügt", { id: toastId });
    } catch (error) {
      console.error("Fehler beim Erhöhen der Menge", error);
      toast.error(
        "Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.",
        { id: toastId }
      );
      dispatch(clearSelectedProduct());
    } finally {
      setIsUpdating(false);
      refetchCart();
    }
  };

  const handleDecrement = async () => {
    if (localQuantity > 0) {
      setIsUpdating(true);
      const toastId = toast.loading("Warenkorb aktualisieren...");
      try {
        const newQuantity = localQuantity - 1;
        const cartItem = cartData?.products?.find(
          (item: any) => item.product_id === product.product_id
        );
        if (cartItem) {
          if (newQuantity === 0) {
            await removeProduct({ id: cartItem.cart_id, quantity: 0 });
            toast.success("Produkt aus Warenkorb entfernt", { id: toastId });
          } else {
            await editProduct({ id: cartItem.cart_id, quantity: newQuantity });
            toast.success("Menge verringert", { id: toastId });
          }
        }
        setLocalQuantity(newQuantity);
      } catch (error) {
        console.error("Fehler beim Verringern der Menge", error);
        toast.error(
          "Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.",
          {
            id: toastId,
          }
        );
      } finally {
        setIsUpdating(false);
        refetchCart();
      }
    }
  };

  return (
    <div className="flex gap-6 bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="relative w-[180px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
        {product.thumb ? (
          <img
            src={product.thumb}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Kein Bild verfügbar</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h3>
            <Link
              href={`/shop/${product.product_id}?menuName=${encodeURIComponent(
                activeCategoryName
              )}`}
              className="text-sm text-first hover:text-first/80 hover:underline"
            >
              Einzelheiten
            </Link>
          </div>
          {product.description && (
            <p className="text-gray-600 text-base max-w-2xl">
              {product.description}
            </p>
          )}
        </div>

        {/* Bottom Section with Updated Button Design */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-first">{product.price}€</div>

          <div className="flex items-center gap-4">
            {localQuantity > 0 ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={isUpdating}
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-first hover:text-first disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-colors"
                >
                  <FaMinus className="size-3.5" />
                </button>
                {isEditing ? (
                  <form
                    onSubmit={handleInputSubmit}
                    className="min-w-[3rem] flex"
                  >
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-12 text-center bg-white border-0 text-xl font-semibold text-gray-800 focus:outline-none focus:ring-0"
                      autoFocus
                      onBlur={() => {
                        if (!inputValue) {
                          setIsEditing(false);
                          setInputValue(localQuantity.toString());
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="w-6 flex items-center justify-center text-first"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <span
                    onClick={() => {
                      setIsEditing(true);
                      setInputValue(localQuantity.toString());
                    }}
                    className="w-12 text-center text-xl font-semibold cursor-pointer"
                  >
                    {localQuantity}
                  </span>
                )}
                <button
                  onClick={handleIncrement}
                  disabled={isUpdating}
                  className="w-10 h-10 rounded-xl bg-first/10 flex items-center justify-center text-first hover:bg-first/20 transition-colors"
                >
                  <FaPlus className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleIncrement}
                disabled={isUpdating}
                className="px-6 py-2.5 bg-first text-white text-sm font-medium rounded-xl hover:bg-first/80 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Auswählen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalMenuCard;
