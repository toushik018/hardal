import React from "react";
import { PackageOrder, MenuContent, CartProduct } from "../../types/types";
import { CartItem } from "./CartItem";
import { Trash2, Loader2 } from "lucide-react";
import { getMenuContents } from "@/constants/categories";

interface CartPackageProps {
  pkg: PackageOrder;
  cartData: any;
  onIncrement: (item: CartProduct) => void;
  onDecrement: (item: CartProduct) => void;
  onRemove: (item: CartProduct) => void;
  loadingStates: { [key: string]: boolean };
  isDeleting: boolean;
  handleDeletePackage: () => void;
}

const getPackageMenuId = (packageName: string): number | undefined => {
  const packageMap: { [key: string]: number } = {
    "Classic Menü": 1,
    "Signature Menü": 2,
    "Exclusive Menü": 3,
    "Fingerfood Menü": 4,
    "BBQ Menü": 5,
    "Fisch Menü": 6,
  };
  return packageMap[packageName];
};

export const CartPackage: React.FC<CartPackageProps> = ({
  pkg,
  cartData,
  onIncrement,
  onDecrement,
  onRemove,
  loadingStates,
  isDeleting,
  handleDeletePackage,
}) => {
  const renderProducts = () => {
    if (!pkg?.products) {
      console.warn("No products found in package:", pkg);
      return null;
    }

    // Group products by category
    const groupedProducts: { [key: string]: CartProduct[] } = {};

    // Process each product and group by category
    Object.entries(pkg.products).forEach(([categoryId, products]) => {
      if (!Array.isArray(products)) return;

      // Get category name from menu contents
      let categoryName = "Andere";

      // Get menu ID from package name instead of using pkg.id
      const menuId = getPackageMenuId(pkg.package);
      const menuContents =
        cartData?.cart?.menu?.contents ||
        (menuId ? getMenuContents(menuId) : []);

      if (menuContents?.length > 0) {
        const category = menuContents.find((content: { ids: number[]; }) =>
          content.ids.includes(parseInt(categoryId))
        );
        if (category?.name) {
          categoryName = category.name;
        }
      }

      // Initialize category array if needed
      if (!groupedProducts[categoryName]) {
        groupedProducts[categoryName] = [];
      }

      // Add products to category
      groupedProducts[categoryName].push(...products);
    });

    console.log("Package ID:", pkg.id);
    console.log("Menu Contents from API:", cartData?.cart?.menu?.contents);
    console.log(
      "Fallback Menu Contents:",
      pkg.id ? getMenuContents(parseInt(pkg.id)) : []
    );

    return (
      <>
        {Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              {categoryName}
            </h3>
            {products.map((item: CartProduct) => (
              <CartItem
                key={item.cart_id}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
                categoryName={categoryName}
                isLoading={loadingStates[item.cart_id]}
              />
            ))}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 bg-first/20 p-4 rounded-[8px]">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {pkg.package}
            {pkg.guests && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                ({pkg.guests} Gäste)
              </span>
            )}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-gray-800">{pkg.price}€</span>
          <button
            onClick={handleDeletePackage}
            disabled={isDeleting}
            className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200"
          >
            {isDeleting ? (
              <Loader2 className="w-5 h-5 animate-spin text-red-500" />
            ) : (
              <Trash2 className="w-5 h-5 text-red-500" />
            )}
          </button>
        </div>
      </div>
      {renderProducts()}
    </div>
  );
};
