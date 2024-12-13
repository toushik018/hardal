/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductList from "@/components/Products/ProductList";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCartQuery, useGetMenuContentQuery, useGetCategoriesQuery, useAddPackageMutation } from "@/services/api";
import ExtraProductsModal from "@/components/Modals/ExtraProductsModal";
import Loading from "@/components/Loading/Loading";

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
    if (typeof window !== 'undefined') {
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
      const validProductIds = allProducts.map((p) =>
        p.product_id.toString()
      );

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
  }, [currentCategory?.name, cartData?.cart?.menu?.contents, cartData?.products, allProducts]);

  // Memoize the current count to prevent infinite loops
  const currentCount = useMemo(() => getCurrentCategoryCount(), [getCurrentCategoryCount]);

  const { data: categoriesData } = useGetCategoriesQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentCategory?.ids) return;

      setIsLoadingProducts(true);
      setAllProducts([]);

      try {
        const productPromises = currentCategory.ids.map(
          (id: number) =>
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
                    category_id: id.toString()
                  }))
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
console.log(currentCategory)
  useEffect(() => {
    if (currentCategory && !categoryStates[currentCategory.name]) {
      setCategoryStates(prev => ({
        ...prev,
        [currentCategory.name]: {
          hasShownModal: false,
          lastCount: currentCount
        }
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
        setCategoryStates(prev => ({
          ...prev,
          [categoryName]: {
            hasShownModal: false,
            lastCount: currentCount
          }
        }));
      }
      // Show modal when conditions are met
      else if (
        currentCount >= requiredCount && 
        !categoryState.hasShownModal && 
        currentCount > categoryState.lastCount
      ) {
        setShowExtraProductsModal(true);
        setCategoryStates(prev => ({
          ...prev,
          [categoryName]: {
            hasShownModal: true,
            lastCount: currentCount
          }
        }));
      }
      // Update last count
      else if (currentCount !== categoryState.lastCount) {
        setCategoryStates(prev => ({
          ...prev,
          [categoryName]: {
            ...prev[categoryName],
            lastCount: currentCount
          }
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
        setCategoryStates(prev => ({
          ...prev,
          [categoryName]: {
            hasShownModal: true,
            lastCount: currentCount
          }
        }));
      }
    };

    window.addEventListener("showExtraProductsModal", handleShowModal);
    return () => window.removeEventListener("showExtraProductsModal", handleShowModal);
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
      localStorage.setItem(`categoryStates-${menuId}`, JSON.stringify(categoryStates));
    }
  }, [categoryStates, menuId]);

  const handleNext = async () => {
    const currentCount = getCurrentCategoryCount();
    const requiredCount = currentCategory?.count || 0;

    if (currentCount < requiredCount) {
      toast.error(
        `Bitte wählen Sie mindestens ${requiredCount} ${currentCategory.name} Artikel${
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
        toast.error("Fehler beim Hinzufügen des Pakets. Bitte versuchen Sie es erneut.");
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
        `Bitte wählen Sie mindestens ${requiredCount} ${currentCategory.name} Artikel${
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
        toast.error("Fehler beim Hinzufügen des Pakets. Bitte versuchen Sie es erneut.");
      }
    }
  };

  if (isCartLoading || isMenuContentLoading || isLoadingProducts)
    return <Loading />;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Sticky Header with Progress */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="w-full px-5 py-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentCategory?.name}
                </h1>
                <span className="text-sm text-gray-500">
                  {currentCategory?.count} Auswahl inklusive im Paket
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Schritt {activeStep + 1} von {menuContents.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    className={`p-2 rounded-full ${
                      activeStep === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    disabled={activeStep === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((activeStep + 1) / menuContents.length) * 100}%`,
                }}
              />
            </div>
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
          <div className="md:w-[650px] w-full sticky top-[90px]">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
                {/* Cart Summary Content */}
                <div className="space-y-4">
                  {/* Required/Selected Count */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Erforderlich: {currentCategory?.count || 0}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ausgewählt: {getCurrentCategoryCount()}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handlePrevious}
                      disabled={activeStep === 0}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-green-600 rounded-xl hover:bg-green-50 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="size-4" />
                      <span className="font-medium">Zurück</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 rounded-xl hover:bg-green-700 text-white transition-colors"
                    >
                      <span className="font-medium">
                        {activeStep === menuContents.length - 1 ? "Zur Kasse" : "Weiter"}
                      </span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
