"use client";

import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "@/app/types/product";
import {
  loadCart,
  addToCart as addToCartLib,
  type CartItem,
} from "@/lib/cart";

// Product taxonomy — filter options for the Spare Parts page.
// These are classification labels, NOT dummy product listings.
// Products will come from FastAPI when integrated.
const productsInitial: Product[] = [];
const categoriesInitial: string[] = [
  "Brake System",
  "Engine Parts",
  "Filters",
  "Suspension",
  "Electrical",
];
const brandsInitial: string[] = ["Toyota", "Honda", "BMW", "Mercedes-Benz"];

// Cart map: { productId: quantity }
export type CartItems = Record<number, number>;

export interface ShopContextType {
  products: Product[];
  categories: string[];
  brands: string[];
  cartItems: CartItems;
  addToCart: (productId: number) => void;
  cartCount: number;
}

export const ShopContext = createContext<ShopContextType>({
  products: [],
  categories: [],
  brands: [],
  cartItems: {},
  addToCart: () => {},
  cartCount: 0,
});

export const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [productsList] = useState<Product[]>(productsInitial || []);
  const [categoriesList] = useState<string[]>(categoriesInitial || []);
  const [brandsList] = useState<string[]>(brandsInitial || []);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItems>({});

  // Synchronize cart state with lib/cart (localStorage + events)
  useEffect(() => {
    const syncCart = () => {
      const items = loadCart();
      const count = items.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      setCartCount(count);

      const itemsMap: CartItems = {};
      items.forEach((item) => {
        const numId = typeof item.id === "number" ? item.id : Number(item.id);
        if (!isNaN(numId)) {
          itemsMap[numId] = (itemsMap[numId] || 0) + (item.qty || 1);
        }
      });
      setCartItems(itemsMap);
    };

    syncCart();
    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const addToCart = (productId: number) => {
    const product = productsList.find((p) => p.id === productId);
    if (!product) return;

    addToCartLib({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/products/oil-filter.jpg",
      brand: product.brand,
      category: product.category,
      qty: 1,
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products: productsList,
        categories: categoriesList,
        brands: brandsList,
        cartItems,
        addToCart,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
