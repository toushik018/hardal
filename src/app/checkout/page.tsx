"use client";

import React, { useState } from "react";
import { useGetPaymentMethodsQuery, useSetPaymentMethodMutation, useGetCartQuery, useSetShippingMethodMutation } from "@/services/api";
import { useSetShippingAddressMutation, useSetPaymentAddressMutation } from "@/services/api";
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
import Loading from "@/components/Loading/Loading";

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
    <div className="min-h-screen bg-third py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="lg:flex">
            <div className="lg:w-1/2 xl:w-3/5 p-8 lg:p-12">
              <h1 className="text-3xl font-bold mb-8 text-second">Checkout</h1>
              
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex justify-between mb-4">
                  {steps.map((s, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`rounded-full p-3 ${
                          step > index 
                            ? 'bg-first text-second' 
                            : step === index 
                              ? 'bg-second text-white' 
                              : 'bg-gray-100 text-gray-400'
                        } mb-3 transition-all duration-300`}
                      >
                        {s.icon}
                      </div>
                      <span className={`text-sm font-medium ${
                        step >= index ? 'text-second' : 'text-gray-400'
                      } text-center max-w-[100px]`}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div 
                    className="bg-first h-1 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Steps Container */}
              <div className="bg-white rounded-2xl">
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
            </div>

            <CheckoutSidebar totalItems={totalItems} totalPrice={totalPrice} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;