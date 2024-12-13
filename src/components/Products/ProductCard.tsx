import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useAddToCartMutation,
  useEditProductMutation,
  useRemoveProductMutation,
  useGetCartQuery,
} from "@/services/api";
import { toast } from "sonner";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
  activeCategoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeCategoryName,
}) => {
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [addToCart] = useAddToCartMutation();
  const [editProduct] = useEditProductMutation();
  const [removeProduct] = useRemoveProductMutation();
  const { data: cartData, refetch: refetchCart } = useGetCartQuery();

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
      toast.error("Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.", { id: toastId });
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

      const currentCategory = cartData?.cart?.menu?.contents?.find(
        (content: any) => content.name === activeCategoryName
      );
      
      if (currentCategory) {
        const requiredCount = currentCategory.count || 0;
        const currentCount = (currentCategory.currentCount || 0) + 1;

        if (currentCount >= requiredCount) {
          window.dispatchEvent(new CustomEvent("showExtraProductsModal", {
            detail: { categoryName: activeCategoryName }
          }));
        }
      }
    } catch (error) {
      console.error("Fehler beim Erhöhen der Menge", error);
      toast.error("Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.", { id: toastId });
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
        toast.error("Fehler beim Aktualisieren des Warenkorbs. Bitte versuchen Sie es erneut.", {
          id: toastId,
        });
      } finally {
        setIsUpdating(false);
        refetchCart();
      }
    }
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-green-100 rounded-lg overflow-hidden flex flex-col h-full transition-all duration-200 group">
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {product.thumb ? (
          <Image
            src={product.thumb}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Kein Bild verfügbar</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-2xl shadow-sm">
          {product.price}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <div className="flex-grow space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[13px] font-medium text-gray-700 leading-tight">
              {product.name}
            </h3>
            <Link
              href={`/shop/${
                product.product_id
              }?menuName=${encodeURIComponent(activeCategoryName)}`}
              className="text-xs text-green-600 hover:text-green-700 hover:underline whitespace-nowrap"
            >
              Einzelheiten
            </Link>
          </div>
        </div>

        <div className="mt-3">
          {localQuantity > 0 ? (
            <div className="flex items-center justify-between bg-green-50 rounded-md border border-green-100">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-l-md transition-colors"
                disabled={isUpdating}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              {isEditing ? (
                <form
                  onSubmit={handleInputSubmit}
                  className="min-w-[2rem] flex"
                >
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-12 text-center bg-white border-0 text-sm font-medium text-gray-800 focus:outline-none focus:ring-0"
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
                    className="w-6 flex items-center justify-center text-green-600"
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
                  className="text-sm font-medium text-gray-800 min-w-[2rem] text-center cursor-pointer hover:bg-green-100 py-1"
                >
                  {localQuantity}
                </span>
              )}
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-r-md transition-colors"
                disabled={isUpdating}
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleIncrement}
              className="w-full py-2 bg-green-600 text-white hover:bg-green-700 text-sm font-medium !rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              disabled={isUpdating}
            >
              Auswählen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
