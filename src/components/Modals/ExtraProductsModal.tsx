"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ExtraProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

const ExtraProductsModal: React.FC<ExtraProductsModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 bg-first/10 w-16 h-16 rounded-2xl flex items-center justify-center"
            >
              <ShoppingBag className="w-8 h-8 text-first" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Kategorie vollständig!
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Sie haben die erforderliche Anzahl an Produkten für diese
                Kategorie ausgewählt. Möchten Sie weitere Produkte hinzufügen
                oder zur nächsten Kategorie wechseln?
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl 
                           font-medium text-gray-700 hover:bg-gray-50 
                           transition-colors duration-200"
                >
                  Weitere Produkte
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  className="flex-1 px-6 py-3 bg-first rounded-xl font-medium 
                           text-gray-900 hover:bg-first/90 transition-colors 
                           duration-200 flex items-center justify-center gap-2"
                >
                  Nächste Kategorie
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Optional: Additional Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-500 text-center mt-4"
              >
                Sie können jederzeit weitere Produkte zu Ihrem Warenkorb
                hinzufügen
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExtraProductsModal;
