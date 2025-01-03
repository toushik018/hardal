"use client";

import { Suspense } from "react";

import OrderConfirmationLoading from "./loading";
import OrderConfirmationContent from "./OrderConfirmationContent";

export default function OrderConfirmation() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
