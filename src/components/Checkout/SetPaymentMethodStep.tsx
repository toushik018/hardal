import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet } from "lucide-react";
import { Loader2 } from "lucide-react";


interface PaymentMethodStepProps {
  paymentMethods: any;
  onSetPaymentMethod: (method: string) => Promise<void>;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({ paymentMethods, onSetPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMethod) return;
    setIsSubmitting(true);
    await onSetPaymentMethod(selectedMethod);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <CreditCard className="w-6 h-6 mr-2 text-green-500" />
        Zahlungsmethode auswählen
      </h2>
      <div className="space-y-4 mb-8">
        {Object.entries(paymentMethods).map(([key, method]: any) => (
          <div key={key} className="bg-gray-50 rounded-xl p-6 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-green-500" />
              {method.name}
            </h3>
            <div className="ml-7 space-y-3">
              {Object.entries(method.option).map(([optionKey, option]: any) => (
                <label key={optionKey} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.code}
                    checked={selectedMethod === option.code}
                    onChange={() => setSelectedMethod(option.code)}
                    className="form-radio text-green-500 focus:ring-green-500 h-5 w-5"
                  />
                  <span className="text-gray-700">{option.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !selectedMethod}
        className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Weiter zur Lieferung"}
      </button>
    </motion.div>
  );
};

export default PaymentMethodStep;