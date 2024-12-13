import { motion, AnimatePresence } from "framer-motion";

interface ExtraProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

const ExtraProductsModal: React.FC<ExtraProductsModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-medium mb-4">
            Sie haben die festgelegte Anzahl der Produkte für diese Paketkategorie ausgewählt.
          </h3>
          <p className="text-gray-600 mb-6">
            Möchten Sie zur nächsten Kategorie übergehen oder weitere Produkte zu einem festen Preis auswählen?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Weiter auswählen
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Nächste Kategorie
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ExtraProductsModal;
