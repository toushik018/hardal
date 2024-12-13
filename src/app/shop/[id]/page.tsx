"use client";

import ProductDetails from "@/components/Products/ProductDetails";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setActiveCategoryName } from "@/redux/actions";

export default function ProductDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [menuName, setMenuName] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentMenuName = searchParams.get("menuName");
    if (currentMenuName) {
      setMenuName(currentMenuName);
      dispatch(setActiveCategoryName(currentMenuName));
    }
  }, [searchParams, dispatch]);

  return (
    <div className="mt-36">
      <ProductDetails id={id} menuName={menuName} />
    </div>
  );
}
