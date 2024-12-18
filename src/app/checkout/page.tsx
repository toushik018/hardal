"use client";

import CheckoutForm, {
  CheckoutFormData,
} from "@/components/Checkout/CheckoutForm";
import { toast } from "sonner";
import { useGetCartQuery } from "@/services/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cartData } = useGetCartQuery();

  const handleSubmit = async (data: CheckoutFormData) => {
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: data,
          cartData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Bestellung erfolgreich aufgegeben!");
        router.push(`/order-confirmation?orderNumber=${result.orderNumber}`);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error("Fehler beim Aufgeben der Bestellung");
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <CheckoutForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
