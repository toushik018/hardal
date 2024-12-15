import React from "react";
import { CartProduct } from "../../types/types";
import { useGetProductByIdQuery } from "@/services/api";
import { CartItemSkeleton } from "@/components/Skeletons/CartSkeleton";
import ProductItem from "@/components/Products/ProductItem";

interface CartItemProps {
  item: CartProduct;
  onIncrement: (item: CartProduct) => void;
  onDecrement: (item: CartProduct) => void;
  onRemove: (item: CartProduct) => void;
  categoryName: string;
  isLoading?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  categoryName,
  isLoading,
}) => {
  if (!item?.cart_id || !item?.product_id || !item?.name) {
    return null;
  }

  const {
    data: productDetails,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductByIdQuery(item.product_id.toString());

  if (isProductLoading) return <CartItemSkeleton />;

  if (productError || !productDetails?.products?.[0]) {
    return (
      <div className="flex justify-start items-center py-4 text-red-500">
        <p>Fehler beim Laden der Produkt-Details.</p>
        <button
          onClick={() => window.location.reload()}
          className="ml-2 underline hover:text-red-600"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  const productForItem = {
    product_id: parseInt(item.product_id),
    name: item.name,
    thumb: item.image || "/placeholder.png",
    price: item.price,
    quantity: parseInt(item.quantity) || 0,
    leadTime: productDetails.products[0].leadTime,
  };

  return (
    <ProductItem
      product={productForItem}
      onIncrement={() => onIncrement(item)}
      onDecrement={() => onDecrement(item)}
      onRemove={() => onRemove(item)}
      isLoading={isLoading}
    />
  );
};
