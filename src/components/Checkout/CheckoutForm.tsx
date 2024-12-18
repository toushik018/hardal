"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>();

  const handleFormSubmit = async (data: CheckoutFormData) => {
    const loadingToast = toast.loading(
      "Bitte warten Sie, während Ihre Bestellung bestätigt wird. Dies kann einen Moment dauern..."
    );
    try {
      await onSubmit(data);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white p-6 rounded-xl shadow-sm"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-2xl font-bold mb-6">Ihre Informationen</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname</Label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Vorname ist erforderlich" }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="firstName"
                  placeholder="Vorname"
                  className={`focus-visible:ring-first ${
                    errors.firstName 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-input"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname</Label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Nachname ist erforderlich" }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Nachname"
                  className={`focus-visible:ring-first ${
                    errors.lastName 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-input"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-Mail ist erforderlich",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ungültige E-Mail-Adresse",
            },
          }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="E-Mail"
                className={`focus-visible:ring-first ${
                  errors.email 
                    ? "border-red-500 focus-visible:ring-red-500" 
                    : "border-input"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer</Label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Telefonnummer ist erforderlich" }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                id="phone"
                type="tel"
                placeholder="Telefonnummer"
                className={`focus-visible:ring-first ${
                  errors.phone 
                    ? "border-red-500 focus-visible:ring-red-500" 
                    : "border-input"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Controller
          name="address"
          control={control}
          rules={{ required: "Adresse ist erforderlich" }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                id="address"
                placeholder="Straße und Hausnummer"
                className={`focus-visible:ring-first ${
                  errors.address 
                    ? "border-red-500 focus-visible:ring-red-500" 
                    : "border-input"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">Stadt</Label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "Stadt ist erforderlich" }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="city"
                  placeholder="Stadt"
                  className={`focus-visible:ring-first ${
                    errors.city 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-input"
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">PLZ</Label>
          <Controller
            name="postalCode"
            control={control}
            rules={{ required: "PLZ ist erforderlich" }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="postalCode"
                  placeholder="PLZ"
                  className={`focus-visible:ring-first ${
                    errors.postalCode 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-input"
                  }`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-first text-white py-4 rounded-xl font-semibold hover:bg-first/90 
                 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Wird verarbeitet...</span>
          </>
        ) : (
          "Bestellung aufgeben"
        )}
      </button>
    </motion.form>
  );
};

export default CheckoutForm; 