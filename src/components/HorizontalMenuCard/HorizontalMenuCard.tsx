"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { 
  useAddToCartMutation, 
  useEditProductMutation,
  useRemoveProductMutation,
  useGetCartQuery 
} from "@/services/api";
import { Product } from "@/types/product";

interface HorizontalMenuCardProps {
  product: Product;
  activeCategoryName: string;
}

const HorizontalMenuCard = ({ product, activeCategoryName }: HorizontalMenuCardProps) => {
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { data: cartData } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [editProduct] = useEditProductMutation();
  const [removeProduct] = useRemoveProductMutation();

  const cartItem = cartData?.cart?.products?.find(
    (item: { product_id: string; quantity: string }) => 
      item.product_id === product.product_id
  );

  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(Number(cartItem.quantity));
    }
  }, [cartItem]);

  const validateCategoryLimit = () => {
    const currentCategory = cartData?.cart?.menu?.contents?.find(
      (content: { name: string; }) => content.name === activeCategoryName
    );

    if (currentCategory && currentCategory.count) {
      const currentCount = currentCategory.currentCount || 0;
      if (currentCount >= currentCategory.count) {
        toast.error(`Maximum ${currentCategory.count} Produkte erlaubt`);
        return false;
      }
    }
    return true;
  };

  const handleIncrement = async () => {
    if (!validateCategoryLimit()) return;

    setIsUpdating(true);
    try {
      if (localQuantity === 0) {
        await addToCart({
          id: product.product_id,
          quantity: 1,
        }).unwrap();
      } else {
        await editProduct({
          id: product.product_id,
          quantity: localQuantity + 1,
        }).unwrap();
      }
      setLocalQuantity(prev => prev + 1);
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Menge");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = async () => {
    setIsUpdating(true);
    try {
      if (localQuantity <= 1) {
        await removeProduct({
          id: product.product_id,
          quantity: 0,
        }).unwrap();
        setLocalQuantity(0);
      } else {
        await editProduct({
          id: product.product_id,
          quantity: localQuantity - 1,
        }).unwrap();
        setLocalQuantity(prev => prev - 1);
      }
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Menge");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuantity = Number(inputValue);
    
    if (isNaN(newQuantity) || newQuantity < 0) {
      setInputValue(localQuantity.toString());
      setIsEditing(false);
      return;
    }

    if (newQuantity > localQuantity && !validateCategoryLimit()) {
      setInputValue(localQuantity.toString());
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      if (newQuantity === 0) {
        await removeProduct({
          id: product.product_id,
          quantity: 0,
        }).unwrap();
      } else {
        await editProduct({
          id: product.product_id,
          quantity: newQuantity,
        }).unwrap();
      }
      setLocalQuantity(newQuantity);
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Menge");
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-6 bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="relative w-[180px] h-[180px] rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={product?.thumb || "/images/default-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h3>
            <span className="px-2 py-1 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
              75g
            </span>
          </div>
          {product.description && (
            <p className="text-gray-600 text-base max-w-2xl">
              {product.description}
            </p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-green-600">
            {product.price}€
          </div>

          <div className="flex items-center gap-4">
            {localQuantity > 0 ? (
              <div className="flex items-center justify-between bg-green-50 rounded-xl border border-green-100">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-l-xl transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-r-xl transition-colors"
                  disabled={isUpdating}
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleIncrement}
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={isUpdating}
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
