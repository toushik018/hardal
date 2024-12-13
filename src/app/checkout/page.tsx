"use client";

import React, { useState } from "react";
import { useGetPaymentMethodsQuery, useSetPaymentMethodMutation, useGetCartQuery, useSetShippingMethodMutation } from "@/services/api";
import { useSetShippingAddressMutation, useSetPaymentAddressMutation } from "@/services/api";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, CheckCircle, MapPin } from "lucide-react";
import PaymentMethodStep from "@/components/Checkout/SetPaymentMethodStep";
import ShippingAddressStep from "@/components/Checkout/SetShippingAddressStep";
import PaymentAddressStep from "@/components/Checkout/SetPaymentAddressStep";
import ShippingMethodStep from "@/components/Checkout/ShippingMethodStep";
import ReviewStep from "@/components/Checkout/ReviewStep";
import ConfirmationStep from "@/components/Checkout/ConfirmationStep";
import CheckoutSidebar from "@/components/Checkout/CheckoutSidebar";

const Checkout: React.FC = () => {
  const { data: paymentData, isLoading: isPaymentLoading, error: paymentError } = useGetPaymentMethodsQuery();
  const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCartQuery();
  const [setPaymentMethod] = useSetPaymentMethodMutation();
  const [setShippingAddress] = useSetShippingAddressMutation();
  const [setPaymentAddress] = useSetPaymentAddressMutation();
  const [setShippingMethod] = useSetShippingMethodMutation();
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    paymentMethod: "",
    shippingAddress: {},
    paymentAddress: {},
    shippingMethod: "",
  });

  if (isPaymentLoading || isCartLoading) return <Loading />;
  if (paymentError || cartError) return <div className="text-red-500">Fehler beim Laden der Daten</div>;

  const paymentMethods = paymentData?.payment_methods || {};
  const totalItems = cartData?.products?.reduce((sum: number, item: any) => sum + Number(item.quantity), 0) || 0;
  const totalPrice = cartData?.totals?.find((item: { title: string }) => item.title === "Total")?.text || "0.00 €";

  const handleSetPaymentMethod = async (method: string) => {
    try {
      await setPaymentMethod({ payment_method: method }).unwrap();
      setCheckoutData({ ...checkoutData, paymentMethod: method });
      toast.success("Zahlungsmethode erfolgreich gesetzt");
      setStep(2);
    } catch (error) {
      toast.error("Fehler beim Setzen der Zahlungsmethode");
    }
  };

  const handleSetShippingAddress = async (data: any) => {
    try {
      await setShippingAddress(data).unwrap();
      setCheckoutData({ ...checkoutData, shippingAddress: data });
      toast.success("Lieferadresse erfolgreich gesetzt");
      setStep(3);
    } catch (error) {
      toast.error("Fehler beim Setzen der Lieferadresse");
    }
  };

  const handleSetPaymentAddress = async (data: any) => {
    try {
      await setPaymentAddress(data).unwrap();
      setCheckoutData({ ...checkoutData, paymentAddress: data });
      toast.success("Rechnungsadresse erfolgreich gesetzt");
      setStep(4);
    } catch (error) {
      toast.error("Fehler beim Setzen der Rechnungsadresse");
    }
  };


  const handleSetShippingMethod = async (method: string) => {
    try {
      await setShippingMethod({ shipping_method: method }).unwrap();
      setCheckoutData({ ...checkoutData, shippingMethod: method });
      toast.success("Liefermethode erfolgreich gesetzt");
      setStep(5);
    } catch (error) {
      toast.error("Fehler beim Setzen der Liefermethode");
    }
  };
  
  

  const steps = [
    { title: "Zahlungsmethode", icon: <CreditCard className="w-6 h-6" /> },
    { title: "Lieferadresse", icon: <Truck className="w-6 h-6" /> },
    { title: "Rechnungsadresse", icon: <MapPin className="w-6 h-6" /> },
    { title: "Liefermethode", icon: <Truck className="w-6 h-6" /> },
    { title: "Bestellüberprüfung", icon: <CheckCircle className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="lg:flex">
            <div className="lg:w-1/2 xl:w-3/5 bg-gray-100 p-8 lg:p-12">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">Kasse</h1>
              
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between mb-2">
                  {steps.map((s, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`rounded-full p-2 ${step > index ? 'bg-green-500 ' : 'bg-gray-200'} mb-2`}>
                        {s.icon}
                      </div>
                      <span className="text-sm font-medium">{s.title}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <PaymentMethodStep
                    paymentMethods={paymentMethods}
                    onSetPaymentMethod={handleSetPaymentMethod}
                  />
                )}

                {step === 2 && (
                  <ShippingAddressStep
                    onSetShippingAddress={handleSetShippingAddress}
                    onBack={() => setStep(1)}
                  />
                )}

                {step === 3 && (
                  <PaymentAddressStep
                    onSetPaymentAddress={handleSetPaymentAddress}
                    onBack={() => setStep(2)}
                  />
                )}

                {step === 4 && (
                  <ShippingMethodStep
                    onSetShippingMethod={handleSetShippingMethod}
                    onBack={() => setStep(3)}
                  />
                )}

                {step === 5 && (
                  <ReviewStep
                    checkoutData={checkoutData}
                    onBack={() => setStep(4)}
                    onConfirm={() => setStep(6)}
                  />
                )}

                {step === 6 && (
                  <ConfirmationStep />
                )}
              </AnimatePresence>
            </div>

            <CheckoutSidebar totalItems={totalItems} totalPrice={totalPrice} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;