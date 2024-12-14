import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from 'lucide-react';

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
      ? product?.price * product?.quantity
      : parseFloat((product?.price || "0").replace(/[^0-9.-]+/g, "")) *
          product?.quantity
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
          src={product?.thumb || "/images/placeholder.png"}
          alt={product?.name || ""}
          width={80}
          height={80}
          className="rounded-md object-cover h-20 w-20"
        />
        <div>
          <span className="font-medium text-gray-800">{product?.name}</span>
          {product?.leadTime && (
            <p className="text-sm text-gray-500">Lead time: {product?.leadTime}</p>
          )}
        </div>
      </div>
      <div className="text-center text-gray-600">{formatPrice(product?.price)} €</div>
      <div className="flex items-center justify-center">
        <motion.div
          className="flex items-center bg-gray-100 rounded-md p-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onDecrement}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-gray-800"
          >
            <Minus size={16} />
          </motion.button> */}
          <div className="w-10 mx-2 text-center font-medium text-gray-800">
            {product?.quantity}
          </div>
          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onIncrement}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-gray-800"
          >
            <Plus size={16} />
          </motion.button> */}
        </motion.div>
      </div>
      <div className="text-right font-semibold text-gray-800 flex items-center justify-end">
        <span className="mr-4">{totalPrice} €</span>
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRemove}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={20} />
        </motion.button> */}
      </div>
    </motion.div>
  );
};

export default ProductItem;

