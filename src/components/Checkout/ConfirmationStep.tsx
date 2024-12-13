import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ConfirmationStep: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Vielen Dank!</h2>
      <p className="text-xl text-gray-600 mb-8">Ihre Bestellung wurde erfolgreich aufgegeben.</p>
      <button
        onClick={() => {/* Handle order completion */}}
        className="bg-green-500 text-white py-4 px-8 rounded-xl font-semibold hover:bg-green-600 transition-colors"
      >
        Bestellung ansehen
      </button>
    </motion.div>
  );
};

export default ConfirmationStep;