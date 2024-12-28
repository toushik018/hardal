"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useGetPackagesQuery } from "@/services/api";
import VerticalCard from "@/components/VerticalCard/VerticalCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import { useEffect, useState } from "react";
import GuestsCountModal from "@/components/Modals/GuestsCountModal";
import { Package } from "@/types/package";
import { clearToken } from "@/redux/slices/sessionSlice";
import { useRouter } from "next/navigation";

const Section2 = () => {
  const isInitialized = useSelector(
    (state: RootState) => state.session.isInitialized
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading, error } = useGetPackagesQuery(undefined, {
    skip: !isInitialized,
  });

  // Core functionality - session management
  useEffect(() => {
    if (isInitialized && isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [isLoading, isInitialized, dispatch]);

  const products = Array.isArray(data) ? data : data?.packages || [];

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  const handleRetry = () => {
    // Clear the token
    dispatch(clearToken());
    // Delete session cookie
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Reload the page to get new session
    window.location.reload();
  };

  const handleGuestCountSubmit = (guestCount: number) => {
    if (selectedPackage) {
      // Store the guest count in URL params
      router.push(`/shop?menu=${selectedPackage.id}&guests=${guestCount}`);
      setShowGuestsModal(false);
      setSelectedPackage(null);
    }
  };

  return (
    <section id="menu-section" className="relative py-32 bg-[#FAFAFA]">
      <div className="absolute inset-0 opacity-5 -z-10" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Header Section - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span
            className="inline-block px-4 py-2 bg-first/10 rounded-xl 
                         text-sm font-medium text-first tracking-wide mb-4"
          >
            Unsere Menüs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Entdecken Sie unsere{" "}
            <span className="text-first">ausgewählten Menüs</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Wählen Sie aus unseren sorgfältig zusammengestellten Menüs für Ihre
            Veranstaltung. Jedes Menü wurde mit Liebe zum Detail kreiert.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="min-h-[600px] relative z-20">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fehler beim Laden der Menüs
              </h3>
              <p className="text-gray-500 mb-6">
                Bitte versuchen Sie es später erneut
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-first text-black rounded-lg hover:bg-first/90 transition-colors"
              >
                Neu laden
              </button>
            </motion.div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-20">
                {products.map((item: Package, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setSelectedPackage(item);
                      setShowGuestsModal(true);
                    }}
                    className="cursor-pointer relative z-20"
                  >
                    <VerticalCard
                      packageData={item}
                      onSelect={(pkg) => {
                        setSelectedPackage(pkg);
                        setShowGuestsModal(true);
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white rounded-2xl shadow-sm"
                >
                  {/* Empty state content */}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedPackage && (
        <div className="relative z-50">
          <GuestsCountModal
            isOpen={showGuestsModal}
            onClose={() => {
              setShowGuestsModal(false);
              setSelectedPackage(null);
            }}
            packageData={selectedPackage}
            onSubmit={handleGuestCountSubmit}
          />
        </div>
      )}
    </section>
  );
};

export default Section2;
