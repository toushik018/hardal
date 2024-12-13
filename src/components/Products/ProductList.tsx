import React from "react";
import HorizontalMenuCard from "../HorizontalMenuCard/HorizontalMenuCard";
import { useGetCategoriesQuery } from "@/services/api";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface MenuContent {
  name: string;
  ids: number[];
  count?: number;
}

interface CategoryProduct extends Product {
  category_id?: string;
}

interface Category {
  id: string;
  title: string;
}

interface ProductListProps {
  products: CategoryProduct[];
  menuContents: MenuContent[];
  activeCategoryName?: string;
  currentCount: number;
  requiredCount: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  menuContents,
  activeCategoryName,
  currentCount,
  requiredCount,
}) => {
  const { data: categoriesData } = useGetCategoriesQuery();

  console.log("currentCount", currentCount);
  console.log("requiredCount", requiredCount);
  console.log("activeCategoryName", activeCategoryName);
  console.log("products", products);
  console.log("menuContents", menuContents);
  console.log("categoriesData", categoriesData);

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full flex justify-center items-center py-12">
        <p className="text-xl text-gray-600">
          Keine Produkte in dieser Kategorie verfügbar.
        </p>
      </div>
    );
  }

  const currentContent = menuContents.find(
    (content) => content.name === activeCategoryName
  );
  const categoryIds = currentContent?.ids || [];

  // one category ID, show all products in a grid
  if (categoryIds.length === 1) {
    return (
      <>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Ausgewählt: {currentCount} / {requiredCount} Produkte
          </div>
        </div>
        <div className="mt-4">
          {products.map((product) => (
            <HorizontalMenuCard
              key={product.product_id}
              product={product}
              activeCategoryName={
                activeCategoryName || menuContents[0]?.name || ""
              }
            />
          ))}
        </div>
      </>
    );
  }

  // For multiple category IDs, group products by their IDs
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Ausgewählt: {currentCount} / {requiredCount} Produkte
        </div>
      </div>

      <div className="space-y-8">
        {categoryIds.map((categoryId) => {
          const category = categoriesData?.categories.find(
            (cat: Category) => cat.id === categoryId.toString()
          );

          const categoryProducts = products.filter(
            (product) => product.category_id === categoryId.toString()
          );

          if (!categoryProducts.length) return null;

          return (
            <div key={categoryId} className="space-y-4">
              {category?.title && (
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  {category.title}
                </h3>
              )}
              {/* Stack cards vertically */}
              <div className="space-y-4">
                {categoryProducts.map((product) => (
                  <HorizontalMenuCard
                    key={product.product_id}
                    product={product}
                    activeCategoryName={activeCategoryName || menuContents[0]?.name || ""}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  );
};

export default ProductList;
