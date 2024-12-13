import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

interface ProductItemProps {
  product: {
    product_id: number;
    name?: string;
    thumb?: string;
    price?: string | number;
    quantity: number;
    leadTime?: string;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const formatPrice = (price: string | number | undefined): string => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    if (typeof price === "string") {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      return isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2);
    }
    return "0.00";
  };

  const totalPrice = formatPrice(
    typeof product.price === "number"
      ? product.price * product.quantity
      : parseFloat((product.price || "0").replace(/[^0-9.-]+/g, "")) *
          product.quantity
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-5 gap-4 items-center py-4 border-b"
    >
      <div className="col-span-2 flex items-center space-x-4">
        <Image
          src={product.thumb || "/images/placeholder.png"}
          alt={product.name || ""}
          width={100}
          height={100}
          className="rounded-md"
        />
        <span className="font-medium">{product.name}</span>
      </div>
      <div className="text-center">{formatPrice(product.price)} €</div>
      <div className="text-center font-medium">{product.quantity}</div>
      <div className="text-right font-semibold">{totalPrice} €</div>
    </motion.div>
  );
};

export default ProductItem;

{
  /* <div className="flex items-center justify-center">
<motion.div
  className="flex items-center bg-green-100 rounded-full p-1"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onDecrement}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm"
  >
    <FiMinus />
  </motion.button>
  <div className="relative w-8 h-8 mx-2 overflow-hidden">
    <AnimatePresence initial={false}>
      <motion.span
        key={product.quantity}
        className="absolute inset-0 flex items-center justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {product.quantity}
      </motion.span>
    </AnimatePresence>
  </div>
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onIncrement}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm"
  >
    <FiPlus />
  </motion.button>
</motion.div>
</div>
<div className="flex items-center justify-end space-x-2">
<AnimatePresence mode="wait">
  <motion.p
    key={totalPrice}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="hidden md:block font-semibold text-md md:text-lg text-gray-800"
  >
    {totalPrice} €
  </motion.p>
</AnimatePresence>
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={onRemove}
  className="text-red-500 hover:text-red-600 transition-colors"
>
  <FiTrash2 className="h-5 w-5" />
</motion.button> */
}
