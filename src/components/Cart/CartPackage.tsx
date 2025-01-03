import React from "react";
import { PackageOrder, MenuContent, CartProduct } from "../../types/types";
import { CartItem } from "./CartItem";
import { Trash2, Loader2 } from "lucide-react";
import { getMenuContents } from "@/constants/categories";
import { getPackageMenuId } from "@/utils/menuUtils";

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
  const getGroupedProducts = () => {
    const groupedProducts: { [key: string]: CartProduct[] } = {};

    if (pkg.products && typeof pkg.products === "object") {
      const menuId = getPackageMenuId(pkg.package);
      const menuContents =
        cartData?.cart?.menu?.contents ||
        (menuId ? getMenuContents(menuId) : []);

      Object.entries(pkg.products).forEach(([categoryId, products]) => {
        if (!Array.isArray(products)) return;

        let categoryName = "Andere";

        if (menuContents?.length > 0) {
          const category = menuContents.find((content: { ids?: number[] }) => {
            return content?.ids && content.ids.includes(parseInt(categoryId));
          });

          if (category?.name) {
            categoryName = category.name;
          } else {
            const fallbackContents = menuId ? getMenuContents(menuId) : [];
            const fallbackCategory = fallbackContents.find(
              (content) =>
                content.ids && content.ids.includes(parseInt(categoryId))
            );
            if (fallbackCategory?.name) {
              categoryName = fallbackCategory.name;
            }
          }
        }

        if (!groupedProducts[categoryName]) {
          groupedProducts[categoryName] = [];
        }

        products.forEach((product) => {
          if (product) {
            groupedProducts[categoryName].push(product);
          }
        });
      });
    }

    return groupedProducts;
  };

  const groupedProducts = getGroupedProducts();

  const renderProducts = () => {
    if (!pkg?.products) {
      console.warn("No products found in package:", pkg);
      return null;
    }

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

export default CartPackage;
