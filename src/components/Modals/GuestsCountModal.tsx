"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface GuestsCountModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: number;
    name: string;
    minimumClients: number;
  };
  onSubmit: (guestCount: number) => void;
}

const GuestsCountModal: React.FC<GuestsCountModalProps> = ({
  isOpen,
  onClose,
  packageData,
  onSubmit,
}) => {
  const [guestCount, setGuestCount] = useState(packageData.minimumClients);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = () => {
    if (guestCount < packageData.minimumClients) {
      setError(`Mindestens ${packageData.minimumClients} Gäste erforderlich`);
      return;
    }
    onSubmit(guestCount);
  };

  const handleGuestCountChange = (value: string) => {
    const count = parseInt(value);
    setGuestCount(count);
    if (count < packageData.minimumClients) {
      setError(`Mindestens ${packageData.minimumClients} Gäste erforderlich`);
    } else {
      setError("");
    }
  };

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 bg-first/10 w-16 h-16 rounded-2xl flex items-center justify-center"
            >
              <Users className="w-8 h-8 text-first" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {packageData.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Anzahl der Gäste
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    min={packageData.minimumClients}
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-first/50"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  Mindestanzahl der Gäste: {packageData.minimumClients}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={!!error || !guestCount}
                  className="w-full px-6 py-3 bg-first rounded-xl font-medium 
                           text-gray-900 hover:bg-first/90 transition-colors 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter zur Auswahl
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestsCountModal;
