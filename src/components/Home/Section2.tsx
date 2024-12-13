"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useGetPackagesQuery } from "@/services/api";
import VerticalCard from "@/components/VerticalCard/VerticalCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import { useEffect } from "react";

// Separate Skeleton component
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl h-[500px] overflow-hidden">
    <div className="h-48 bg-gray-200" />
    <div className="p-6">
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="h-12 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

const Section2 = () => {
  const isInitialized = useSelector(
    (state: RootState) => state.session.isInitialized
  );
  const dispatch = useDispatch();
  
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

  return (
    <section className="relative py-32 bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-[url('/patterns/dot-pattern.png')] opacity-5" />

      <div className="container mx-auto px-4">
        {/* Header Section - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-first/10 rounded-xl 
                         text-sm font-medium text-first tracking-wide mb-4">
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
        <div className="min-h-[600px]">
          {isLoading ? (
            // Simple skeleton with fixed count
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5].map((index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fehler beim Laden der Menüs
              </h3>
              <p className="text-gray-500">
                Bitte versuchen Sie es später erneut
              </p>
            </motion.div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((item: any, idx: any) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/order/vorspeise?selectedMenu=${item.id}`}
                      className="block h-full"
                    >
                      <VerticalCard packageData={item} />
                    </Link>
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
    </section>
  );
};

export default Section2;
