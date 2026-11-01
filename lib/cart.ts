export interface CartItem {
  id: number | string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  qty: number;
  emoji?: string;
  image?: string;
}

export const CART_KEY = "autopro-cart";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

export function getCartCount(): number {
  const items = loadCart();
  return items.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
}

export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }): CartItem[] {
  const items = loadCart();
  const existingIndex = items.findIndex((i) => i.id === item.id || (i.sku && item.sku && i.sku === item.sku));
  const addQty = item.qty && item.qty > 0 ? item.qty : 1;

  let newItems: CartItem[];
  if (existingIndex > -1) {
    newItems = items.map((i, idx) =>
      idx === existingIndex ? { ...i, qty: i.qty + addQty } : i
    );
  } else {
    newItems = [...items, { ...item, qty: addQty }];
  }

  saveCart(newItems);
  return newItems;
}

