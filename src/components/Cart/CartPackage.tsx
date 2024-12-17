import React from "react";
import { PackageOrder, MenuContent, CartProduct } from "../../types/types";
import { CartItem } from "./CartItem";
import { Trash2, Loader2 } from "lucide-react";
import { useDeletePackageMutation } from "@/services/api";
import { toast } from "sonner";

interface CartPackageProps {
  pkg: PackageOrder;
  cartData: any;
  onIncrement: (item: CartProduct) => void;
  onDecrement: (item: CartProduct) => void;
  onRemove: (item: CartProduct) => void;
  loadingStates: { [key: string]: boolean };
}

export const CartPackage: React.FC<CartPackageProps> = ({
  pkg,
  cartData,
  onIncrement,
  onDecrement,
  onRemove,
  loadingStates,
}) => {
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();
  
  const handleDeletePackage = async () => {
    try {
      if (!pkg.id) {
        toast.error("Paket ID nicht gefunden");
        return;
      }
      const response = await deletePackage({ id: pkg.id }).unwrap();
      console.log(response);
      toast.success(`${pkg.package} wurde erfolgreich entfernt`);
    } catch (error) {
      toast.error("Fehler beim Entfernen des Pakets");
    }
  };

  const renderProducts = () => {
    if (!pkg?.products) {
      console.warn("No products found in package:", pkg);
      return null;
    }

    if (cartData?.cart?.menu?.contents) {
      return (
        <>
          {cartData.cart.menu.contents.map((content: MenuContent) => {
            const categoryId = content.ids?.[0]?.toString();
            const categoryProducts = categoryId
              ? pkg.products[categoryId]
              : null;

            if (!categoryProducts?.length) return null;

            return (
              <div key={content.name} className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  {content.name}
                </h3>
                {categoryProducts.map((item: CartProduct) => (
                  <CartItem
                    key={item.cart_id}
                    item={item}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onRemove={onRemove}
                    categoryName={content.name}
                    isLoading={loadingStates[item.cart_id]}
                  />
                ))}
              </div>
            );
          })}
        </>
      );
    }

    const allProducts = Object.values(pkg.products).flat();
    if (!allProducts.length) {
      console.warn("No products found in package after flattening:", pkg);
      return null;
    }

    return (
      <div className="space-y-4">
        {allProducts.map((item: CartProduct) => (
          <CartItem
            key={item.cart_id}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
            categoryName=""
            isLoading={loadingStates[item.cart_id]}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 bg-first/20 p-4 rounded-[8px]">
        <h2 className="text-xl font-semibold text-gray-800">{pkg.package}</h2>
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
