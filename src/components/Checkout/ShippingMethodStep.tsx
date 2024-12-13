import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useGetShippingMethodQuery, useSetShippingMethodMutation } from "@/services/api";
import Loading from "../Loading";

interface ShippingMethodStepProps {
  onSetShippingMethod: (method: string) => Promise<void>;
  onBack: () => void;
}

const ShippingMethodStep: React.FC<ShippingMethodStepProps> = ({ onSetShippingMethod, onBack }) => {
  const { data: shippingMethodsData, isLoading, error } = useGetShippingMethodQuery();
  const [setShippingMethod] = useSetShippingMethodMutation();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMethod) return;
    setIsSubmitting(true);
    try {
      await setShippingMethod({ shipping_method: selectedMethod }).unwrap();
      await onSetShippingMethod(selectedMethod);
    } catch (error) {
      console.error("Fehler beim Setzen der Liefermethode:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Fehler beim Laden der Liefermethoden</div>;

  const shippingMethods = shippingMethodsData?.shipping_methods || {};
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Truck className="w-6 h-6 mr-2 text-green-500" />
        Liefermethode auswählen
      </h2>
      <div className="space-y-4 mb-8">
        {Object.entries(shippingMethods).map(([key, method]: [string, any]) => (
          <div key={key} className="bg-gray-50 rounded-xl p-6 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-500" />
              {method.name}
            </h3>
            <div className="ml-7 space-y-3">
              {Object.entries(method.quote).map(([quoteKey, quote]: [string, any]) => (
                <label key={quoteKey} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={quote.code}
                    checked={selectedMethod === quote.code}
                    onChange={() => setSelectedMethod(quote.code)}
                    className="form-radio text-green-500 focus:ring-green-500 h-5 w-5"
                  />
                  <span className="text-gray-700">{quote.name}</span>
                  {/* <span className="text-gray-500 ml-auto">{quote.text}</span> */}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="w-1/2 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Zurück
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedMethod}
          className="w-1/2 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Weiter zur Überprüfung"}
        </button>
      </div>
    </motion.div>
  );
};

export default ShippingMethodStep;