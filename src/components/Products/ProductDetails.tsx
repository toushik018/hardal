"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Leaf,
  Globe,
  Package,
  Minus,
  Plus,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
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
    <div className="container mx-auto px-4 md:py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-md">
          {selectedProduct.thumb && (
            <Image
              src={selectedProduct.thumb}
              layout="fill"
              objectFit="cover"
              alt={selectedProduct.name}
            />
          )}
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {selectedProduct.name}
            </h1>
            {menuName && (
              <div className="bg-green-600 text-white text-sm font-semibold px-6 py-2 rounded-full inline-block mb-6">
                {menuName}
              </div>
            )}
            <p className="text-gray-700 mb-8 text-xl leading-relaxed">
              {selectedProduct.description}
            </p>

            {selectedProduct.allergens && (
              <div className="mb-8 p-6 bg-yellow-50 rounded-2xl">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
                  <AlertCircle className="mr-2" size={24} />
                  Allergene
                </h3>
                <p className="text-md text-yellow-700">
                  {selectedProduct.allergens.join(", ")}
                </p>
              </div>
            )}

            <div className="text-5xl font-bold mb-6 text-green-600">
              {selectedProduct.price}
            </div>

            {selectedProduct.preparationTime && (
              <p className="text-md text-gray-500 mb-8">
                Vorlaufzeit: {selectedProduct.preparationTime}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-between border-2 border-green-600 rounded-full overflow-hidden w-full md:w-auto">
                <button
                  className="p-3 text-green-600 hover:bg-green-100 transition duration-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={24} />
                </button>
                <input
                  type="number"
                  className="w-20 text-center bg-transparent focus:outline-none text-xl"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <button
                  className="p-3 text-green-600 hover:bg-green-100 transition duration-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={24} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-green-600 hover:bg-green-700 w-1/2 text-white px-4 py-3 md:px-8 rounded-full font-semibold transition duration-300 flex items-center justify-center text-lg"
              >
                <ShoppingCart className="mr-4 hidden md:block" size={28} />
                <span className="whitespace-nowrap"> In den Warenkorb</span>
              </button>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-gray-200">
              <FeatureItem
                icon={<Leaf className="w-8 h-8 md:w-10 md:h-10" />}
                text="Naturbelassene Zutaten"
              />
              <FeatureItem
                icon={<Globe className="w-8 h-8 md:w-10 md:h-10" />}
                text="Klimaneutral"
              />
              <FeatureItem
                icon={<Package className="w-8 h-8 md:w-10 md:h-10" />}
                text="Pakete für alle"
              />
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

const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-green-600 mb-3">{icon}</div>
    <p className="text-md text-gray-700">{text}</p>
  </div>
);

export default ProductDetails;
