import { PackageOrder } from "@/types/types";
import { getPackageMenuId } from "@/utils/menuUtils";
import { getMenuContents } from "@/constants/categories";

interface CartData {
    cart?: {
        order: PackageOrder[] | { [key: string]: PackageOrder };
        menu?: {
            contents: {
                name: string;
                ids: number[];
                count: number;
            }[];
        };
    };
}

export const calculateExtrasTotal = (cartData: CartData): number => {
    if (!cartData?.cart?.order) return 0;

    const orderArray = Array.isArray(cartData.cart.order)
        ? cartData.cart.order
        : Object.values(cartData.cart.order);

    return orderArray.reduce((total: number, pkg: PackageOrder) => {
        if (!pkg?.products) return total;

        // Get menu ID from package name
        const menuId = getPackageMenuId(pkg.package);
        const menuContents =
            cartData?.cart?.menu?.contents ||
            (menuId ? getMenuContents(menuId) : []);

        // Get extra category IDs from menu contents or fallback
        const extraIds = (menuContents?.find(
            (content: { name: string }) => content.name === "Extras"
        )?.ids || ["63", "66", "69"]) as (string | number)[];

        // Sum up totals for products in extra categories
        return (
            total +
            Object.entries(pkg.products).reduce(
                (packageTotal, [categoryId, products]) => {
                    // Convert extraIds to numbers for comparison
                    const extraIdsNumbers = extraIds.map(id =>
                        typeof id === 'string' ? parseInt(id) : id
                    );

                    // Now compare with the converted array
                    if (!extraIdsNumbers.includes(parseInt(categoryId) as never)) return packageTotal;

                    if (Array.isArray(products)) {
                        return (
                            packageTotal +
                            products.reduce((productTotal, product) => {
                                return productTotal + (product.total || 0);
                            }, 0)
                        );
                    }
                    return packageTotal;
                },
                0
            )
        );
    }, 0);
};

export const calculateTotals = (cartData: CartData, extrasTotal: number) => {
    try {
        let calculatedTotal = 0;

        if (cartData?.cart?.order) {
            const packages = Array.isArray(cartData.cart.order)
                ? cartData.cart.order
                : Object.values(cartData.cart.order);

            packages.forEach((pkg: PackageOrder) => {
                // Base package price
                const basePackagePrice = pkg.price * (pkg.guests || 1);

                // Add products with quantity >= 10
                let productsOver10Total = 0;
                Object.values(pkg.products).forEach((products) => {
                    products.forEach((product) => {
                        const quantity = Number(product.quantity);
                        if (quantity >= 10 && quantity % 10 === 0 && product.price > 0) {
                            productsOver10Total += product.total;
                        }
                    });
                });

                calculatedTotal += basePackagePrice + productsOver10Total;
            });
        }

        return {
            subTotal: calculatedTotal.toFixed(2) + "€",
            totalPrice: (calculatedTotal + extrasTotal).toFixed(2) + "€",
        };
    } catch (error) {
        console.error("Error calculating totals:", error);
        return { subTotal: "0.00€", totalPrice: "0.00€" };
    }
};

export const formatExtrasTotal = (extrasTotal: number): string => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(extrasTotal);
}; 