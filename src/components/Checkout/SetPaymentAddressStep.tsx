import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";

interface PaymentAddressStepProps {
  onSetPaymentAddress: (data: any) => Promise<void>;
  onBack: () => void;
}

// Static data for countries and zones
const countries = [
  { id: "1", name: "Germany" },
  { id: "2", name: "Austria" },
  { id: "3", name: "Switzerland" },
  { id: "4", name: "Netherlands" },
  { id: "5", name: "Belgium" },
  // ... other countries
];

const zones = [
  { id: "1", name: "Berlin" },
  { id: "2", name: "Hamburg" },
  { id: "3", name: "Munich" },
  { id: "4", name: "Frankfurt" },
  { id: "5", name: "Cologne" },
  { id: "6", name: "Dresden" },
  { id: "7", name: "Leipzig" },
  { id: "8", name: "Stuttgart" },
  { id: "9", name: "Bremen" },
  { id: "10", name: "Bonn" },
  // ... other zones
];

const PaymentAddressStep: React.FC<PaymentAddressStepProps> = ({ onSetPaymentAddress, onBack }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      address_1: "",
      city: "",
      country_id: "",
      zone_id: "",
      payment_address_id: "",
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    await onSetPaymentAddress(data);
  });

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <MapPin className="w-6 h-6 mr-2 text-green-500" />
        Rechnungsadresse setzen
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="firstname"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Vorname"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            )}
          />
          {errors.firstname && <p className="mt-1 text-red-500">{errors.firstname.message}</p>}
        </div>
        <div>
          <Controller
            name="lastname"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Nachname"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            )}
          />
          {errors.lastname && <p className="mt-1 text-red-500">{errors.lastname.message}</p>}
        </div>
      </div>
      <div>
        <Controller
          name="address_1"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Adresse"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          )}
        />
        {errors.address_1 && <p className="mt-1 text-red-500">{errors.address_1.message}</p>}
      </div>
      <div>
        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Stadt"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          )}
        />
        {errors.city && <p className="mt-1 text-red-500">{errors.city.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="country_id"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Land auswählen</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.country_id && <p className="mt-1 text-red-500">{errors.country_id.message}</p>}
        </div>
        <div>
          <Controller
            name="zone_id"
            control={control}
            rules={{ required: "State/Province is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Bundesland auswählen</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.zone_id && <p className="mt-1 text-red-500">{errors.zone_id.message}</p>}
        </div>
      </div>
      <Controller
        name="payment_address_id"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="hidden"
          />
        )}
      />
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/2 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Zurück
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Bestellung überprüfen"}
        </button>
      </div>
    </motion.form>
  );
};

export default PaymentAddressStep;