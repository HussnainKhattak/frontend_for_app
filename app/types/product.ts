export interface Compatibility {
  make: string;
  models: string[];
  yearFrom: number;
  yearTo: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  inStock: boolean;
  images: string[];
  compatibility: Compatibility;
}

