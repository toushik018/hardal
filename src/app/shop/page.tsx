/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductList from "@/components/Products/ProductList";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useGetCartQuery,
  useGetMenuContentQuery,
  useGetCategoriesQuery,
  useAddPackageMutation,
} from "@/services/api";
import ExtraProductsModal from "@/components/Modals/ExtraProductsModal";
import Loading from "@/components/Loading/Loading";
import Stepper from "@/components/Stepper/Stepper";
import { ShopSkeleton } from "@/components/Skeletons";
import CartSummary from "@/components/Cart/CartSummary";

interface MenuContent {
  name: string;
  ids: number[];
  count: number;
  currentCount?: number;
}

const Shop = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menu");
  const router = useRouter();
  const [showExtraProductsModal, setShowExtraProductsModal] = useState(false);
  const [categoryStates, setCategoryStates] = useState<{
    [key: string]: {
      hasShownModal: boolean;
      lastCount: number;
    };
  }>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`categoryStates-${menuId}`);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: menuContentData, isLoading: isMenuContentLoading } =
    useGetMenuContentQuery(Number(menuId));

  const currentCategory = menuContentData?.contents[activeStep];
  const menuContents = menuContentData?.contents || [];

  const [addPackage] = useAddPackageMutation();

  // Memoize getCurrentCategoryCount
  const getCurrentCategoryCount = useCallback(() => {
    if (!currentCategory || !cartData?.cart?.menu?.contents) return 0;

    const cartCategory = cartData.cart.menu.contents.find(
      (content: any) => content.name === currentCategory.name
    );

    if (cartCategory?.currentCount !== undefined) {
      return cartCategory.currentCount;
    }

    if (cartData.products && cartData.products.length > 0) {
      const validProductIds = allProducts.map((p) => p.product_id.toString());

      const categoryProducts = cartData.products.filter(
        (product: { product_id: any }) =>
          validProductIds.includes(product.product_id)
      );

      return categoryProducts.reduce(
        (sum: number, product: any) => sum + Number(product.quantity),
        0
      );
    }

    return 0;
  }, [
    currentCategory?.name,
    cartData?.cart?.menu?.contents,
    cartData?.products,
    allProducts,
  ]);

  // Memoize the current count to prevent infinite loops
  const currentCount = useMemo(
    () => getCurrentCategoryCount(),
    [getCurrentCategoryCount]
  );

  const { data: categoriesData } = useGetCategoriesQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentCategory?.ids) return;

      setIsLoadingProducts(true);
      setAllProducts([]);

      try {
        const productPromises = currentCategory.ids.map((id: number) =>
          fetch(`/api/get-products-by-category`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryId: id.toString() }),
          }).then(async (res) => {
            const data = await res.json();
            if (data.products) {
              return {
                ...data,
                products: data.products.map((product: any) => ({
                  ...product,
                  category_id: id.toString(),
                })),
              };
            }
            return data;
          })
        );

        const results = await Promise.all(productPromises);
        const combinedProducts = results.reduce((acc, result) => {
          if (result.products) {
            return [...acc, ...result.products];
          }
          return acc;
        }, []);

        setAllProducts(combinedProducts);
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
        toast.error("Fehler beim Laden der Produkte");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [currentCategory?.ids]);
  console.log(currentCategory);
  useEffect(() => {
    if (currentCategory && !categoryStates[currentCategory.name]) {
      setCategoryStates((prev) => ({
        ...prev,
        [currentCategory.name]: {
          hasShownModal: false,
          lastCount: currentCount,
        },
      }));
    }
  }, [currentCategory?.name, currentCount]);

  // Handle modal visibility and state updates
  useEffect(() => {
    if (!currentCategory) return;

    const categoryName = currentCategory.name;
    const requiredCount = currentCategory.count || 0;
    const categoryState = categoryStates[categoryName];

    if (categoryState) {
      // Reset modal state if count drops below requirement
      if (currentCount < requiredCount) {
        setCategoryStates((prev) => ({
          ...prev,
          [categoryName]: {
            hasShownModal: false,
            lastCount: currentCount,
          },
        }));
      }
      // Show modal when conditions are met
      else if (
        currentCount >= requiredCount &&
        !categoryState.hasShownModal &&
        currentCount > categoryState.lastCount
      ) {
        setShowExtraProductsModal(true);
        setCategoryStates((prev) => ({
          ...prev,
          [categoryName]: {
            hasShownModal: true,
            lastCount: currentCount,
          },
        }));
      }
      // Update last count
      else if (currentCount !== categoryState.lastCount) {
        setCategoryStates((prev) => ({
          ...prev,
          [categoryName]: {
            ...prev[categoryName],
            lastCount: currentCount,
          },
        }));
      }
    }
  }, [currentCategory?.name, currentCount]);

  useEffect(() => {
    if (!currentCategory) return;

    const handleShowModal = () => {
      const categoryName = currentCategory.name;
      const requiredCount = currentCategory.count || 0;
      const categoryState = categoryStates[categoryName];

      if (currentCount >= requiredCount && !categoryState?.hasShownModal) {
        setShowExtraProductsModal(true);
        setCategoryStates((prev) => ({
          ...prev,
          [categoryName]: {
            hasShownModal: true,
            lastCount: currentCount,
          },
        }));
      }
    };

    window.addEventListener("showExtraProductsModal", handleShowModal);
    return () =>
      window.removeEventListener("showExtraProductsModal", handleShowModal);
  }, [currentCategory?.name, currentCount, categoryStates]);

  useEffect(() => {
    setShowExtraProductsModal(false);
  }, [activeStep]);

  useEffect(() => {
    return () => {
      if (menuId) {
        localStorage.removeItem(`categoryStates-${menuId}`);
      }
    };
  }, [menuId]);

  useEffect(() => {
    if (menuId) {
      localStorage.setItem(
        `categoryStates-${menuId}`,
        JSON.stringify(categoryStates)
      );
    }
  }, [categoryStates, menuId]);

  const handleNext = async () => {
    const currentCount = getCurrentCategoryCount();
    const requiredCount = currentCategory?.count || 0;

    if (currentCount < requiredCount) {
      toast.error(
        `Bitte wählen Sie mindestens ${requiredCount} ${
          currentCategory.name
        } Artikel${
          requiredCount > 1 ? "s" : ""
        }. Sie haben ${currentCount} ausgewählt.`
      );
      return;
    }

    if (activeStep < menuContents.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // This is the last step, call addPackage before proceeding to cart
      try {
        await addPackage().unwrap();
        router.push("/cart");
      } catch (error) {
        toast.error(
          "Fehler beim Hinzufügen des Pakets. Bitte versuchen Sie es erneut."
        );
      }
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleModalNext = async () => {
    const currentCount = getCurrentCategoryCount();
    const requiredCount = currentCategory?.count || 0;

    if (currentCount < requiredCount) {
      toast.error(
        `Bitte wählen Sie mindestens ${requiredCount} ${
          currentCategory.name
        } Artikel${
          requiredCount > 1 ? "s" : ""
        }. Sie haben ${currentCount} ausgewählt.`
      );
      return;
    }

    setShowExtraProductsModal(false);
    if (activeStep < menuContents.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      // Last step, call addPackage before proceeding
      try {
        await addPackage().unwrap();
        router.push("/cart");
      } catch (error) {
        toast.error(
          "Fehler beim Hinzufügen des Pakets. Bitte versuchen Sie es erneut."
        );
      }
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for smoother transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const guestCount = searchParams.get("guests");

  useEffect(() => {
    // Redirect if no guest count
    if (!guestCount) {
      router.push("/");
    }
  }, [guestCount, router]);

  if (isCartLoading || isMenuContentLoading || isLoadingProducts || isLoading) {
    return <ShopSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Sticky Header with Professional Stepper */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="w-full px-5 py-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Category Info */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentCategory?.name}
                </h1>
                <span className="text-sm text-gray-500">
                  {currentCategory?.count} Auswahl inklusive im Paket
                </span>
              </div>
            </div>

            {/* Use Stepper Component */}
            <Stepper
              steps={menuContents}
              activeStep={activeStep}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isLastStep={activeStep === menuContents.length - 1}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-5 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Column - Products */}
          <div className="grow w-full">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <ProductList
                  products={allProducts}
                  menuContents={menuContents}
                  activeCategoryName={currentCategory?.name}
                  currentCount={getCurrentCategoryCount()}
                  requiredCount={currentCategory?.count || 0}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <CartSummary 
            cartData={cartData}
            currentCategory={currentCategory}
            getCurrentCategoryCount={getCurrentCategoryCount}
            activeStep={activeStep}
            menuContents={menuContents}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* Keep your existing modal */}
      <ExtraProductsModal
        isOpen={showExtraProductsModal}
        onClose={() => setShowExtraProductsModal(false)}
        onNext={handleModalNext}
      />
    </div>
  );
};

export default Shop;
