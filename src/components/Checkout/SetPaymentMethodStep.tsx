import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet } from "lucide-react";
import { Loader2 } from "lucide-react";


interface PaymentMethodStepProps {
  paymentMethods: any;
  onSetPaymentMethod: (method: string) => Promise<void>;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({
  paymentMethods,
  onSetPaymentMethod,
}) => {
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
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-first/10 p-3 rounded-xl">
          <CreditCard className="w-6 h-6 text-second" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-second">
            Zahlungsmethode auswählen
          </h2>
          <p className="text-gray-500 text-sm">
            Wählen Sie Ihre bevorzugte Zahlungsmethode
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(paymentMethods).map(([key, method]: any) => (
          <div
            key={key}
            className="bg-white rounded-xl border border-gray-100 hover:border-first/50 
                     transition-all duration-200 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="font-semibold text-lg text-second mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-first" />
                {method.name}
              </h3>
              
              <div className="space-y-3">
                {Object.entries(method.option).map(([optionKey, option]: any) => (
                  <label
                    key={optionKey}
                    className="flex items-center p-4 rounded-xl cursor-pointer
                             hover:bg-third transition-colors"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.code}
                      checked={selectedMethod === option.code}
                      onChange={() => setSelectedMethod(option.code)}
                      className="form-radio text-first focus:ring-first h-5 w-5"
                    />
                    <span className="ml-3 text-gray-700">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !selectedMethod}
        className="w-full bg-second text-white py-4 rounded-xl font-medium
                 hover:bg-second/90 transition-colors flex items-center justify-center
                 disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Weiter zur Lieferung"
        )}
      </button>
    </motion.div>
  );
};

export default PaymentMethodStep;