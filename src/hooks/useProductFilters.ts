// useProductFilters.ts

import { useState, useEffect } from 'react';
import { Filters, Product } from '@/types/product';

export const useProductFilters = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [sortBy, setSortBy] = useState<string>("standard");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (category: keyof Filters, value: string[]) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: value,
        }));
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const applyFilters = (products: Product[]): Product[] => {
        return products.filter((product) => {
            if (
                filters.categories &&
                filters.categories.length > 0 &&
                !filters.categories.includes(product.category)
            ) {
                return false;
            }
            if (filters.allergens && filters.allergens.length > 0) {
                for (const allergen of filters.allergens) {
                    if (!product?.allergenFree?.includes(allergen)) {
                        return false;
                    }
                }
            }
            return true;
        });
    };

    const applySorting = (products: Product[]): Product[] => {
        return products.slice().sort((a, b) => {
            if (sortBy === "price-asc")
                return (
                    parseFloat(a.price.replace("$", "")) -
                    parseFloat(b.price.replace("$", ""))
                );
            if (sortBy === "price-desc")
                return (
                    parseFloat(b.price.replace("$", "")) -
                    parseFloat(a.price.replace("$", ""))
                );
            return 0;
        });
    };

    const filteredProducts = applySorting(applyFilters(products));

    return {
        products: filteredProducts,
        loading,
        filters,
        sortBy,
        handleFilterChange,
        handleSortChange,
    };
};