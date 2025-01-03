import { Loader2 } from "lucide-react";

export default function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Bestellung wird geladen...</span>
      </div>
    </div>
  );
}
