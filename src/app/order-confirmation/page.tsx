"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Download, Mail } from "lucide-react";
import Link from "next/link";

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (!orderNumber) {
      router.push("/");
    }
  }, [orderNumber, router]);

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Bestellung erfolgreich aufgegeben!
            </h1>
            <p className="text-lg text-gray-600">
              Vielen Dank für Ihre Bestellung bei Hardal Restaurant
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Bestellnummer
              </h2>
              <span className="text-lg font-mono text-first">
                #{orderNumber}
              </span>
            </div>
            <p className="text-gray-600">
              Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.
              Bitte überprüfen Sie auch Ihren Spam-Ordner.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nächste Schritte
            </h3>
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-gray-400 mt-0.5" />
              <p className="text-gray-600">
                Sie erhalten in Kürze eine E-Mail mit Ihrer Bestellbestätigung
                und weiteren Details.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Download className="w-6 h-6 text-gray-400 mt-0.5" />
              <p className="text-gray-600">
                Ein Angebot wurde an Ihre E-Mail-Adresse gesendet.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 inline-flex justify-center items-center px-6 py-4 border border-transparent rounded-xl 
                       text-base font-medium text-white bg-first hover:bg-first/90 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-first"
            >
              Zurück zur Startseite
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex justify-center items-center px-6 py-4 border border-gray-300 rounded-xl 
                       text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-first"
            >
              Weitere Bestellung aufgeben
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
