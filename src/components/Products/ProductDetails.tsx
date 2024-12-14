"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, AlertCircle, Minus, Plus } from "lucide-react";
import Loading from "../Loading/Loading";
import { toast } from "sonner";
import { useGetProductByIdQuery, useAddToCartMutation } from "@/services/api";

interface Product {
  product_id: string;
  thumb: string;
  name: string;
  description: string;
  price: string;
  special: boolean;
  tax: string;
  minimum: string;
  rating: number;
  href: string;
  allergens?: string[];
  preparationTime?: string;
  menuName?: string;
}

const ProductDetails: React.FC<{ id: string; menuName: string | null }> = ({
  id,
  menuName,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const [addToCart] = useAddToCartMutation();

  const selectedProduct = productData?.products[0];

  const handleAddToCart = async () => {
    const toastId = toast.loading("Produkt wird zum Warenkorb hinzugefügt...");
    try {
      await addToCart({
        id: selectedProduct?.product_id,
        quantity,
      });
      toast.success("Produkt erfolgreich zum Warenkorb hinzugefügt", { id: toastId });
    } catch (error) {
      toast.error("Fehler beim Hinzufügen des Produkts zum Warenkorb", { id: toastId });
      console.error("Add to cart error:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message="Fehler beim Laden des Produkts" />;
  if (!selectedProduct) return <ErrorDisplay message="Produkt nicht gefunden" />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Image */}
          <div className="relative aspect-square">
            <Image
              src={selectedProduct.thumb || "/images/placeholder.png"}
              layout="fill"
              objectFit="cover"
              alt={selectedProduct.name}
              className="object-cover"
            />
            {menuName && (
              <div className="absolute top-4 left-4 bg-first text-second px-4 py-2 rounded-xl text-sm font-medium">
                {menuName}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="p-8 flex flex-col h-full">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-second">
                    {selectedProduct.price} €
                  </span>
                  {selectedProduct.minimum && (
                    <span className="text-sm text-gray-500">
                      Min. Bestellung: {selectedProduct.minimum}
                    </span>
                  )}
                </div>

                {selectedProduct.preparationTime && (
                  <p className="text-sm text-gray-500">
                    Vorlaufzeit: {selectedProduct.preparationTime}
                  </p>
                )}

                {selectedProduct.allergens && (
                  <div className="bg-third/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-second" />
                      <span className="font-medium text-gray-700">Allergene</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.allergens.map((allergen: string, index: number) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm text-gray-600"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-third rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-second hover:text-second/80 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center bg-transparent border-none text-lg font-medium focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-second hover:text-second/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-first hover:bg-first/90 text-second py-3 rounded-xl 
                           font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  In den Warenkorb
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center h-screen text-red-500">
    <AlertCircle className="mr-2" size={24} />
    {message}
  </div>
);

export default ProductDetails;
