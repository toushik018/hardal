import { toast } from "sonner";

export const handleError = (error: any, defaultMessage: string) => {
  const errorMessage = error?.data?.message || error?.message || defaultMessage;
  toast.error(errorMessage);
  console.error(defaultMessage, error);
  return null;
};

export const formatPrice = (price: string | number | undefined): string => {
  try {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    if (typeof price === "string") {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      return isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2);
    }
    return "0.00";
  } catch (error) {
    console.error('Error formatting price:', error);
    return "0.00";
  }
}; 