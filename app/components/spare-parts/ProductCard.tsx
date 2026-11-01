import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/app/types/product";

const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString("en-US")}`;

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { id, sku, name, brand, category, price, oldPrice, inStock, images } =
    product;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Image + stock badge (image na aaye to grey box dikhta rehta hai) */}
      <Link href={`/product/${id}`} className="relative block h-40 bg-slate-200">
        {images[0] && (
          <Image
            src={images[0]}
            alt={name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 50vw"
            className="object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium ${
            inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-slate-500">SKU: {sku}</p>
        <Link
          href={`/product/${id}`}
          className="mt-1 font-semibold text-slate-900 hover:text-blue-600"
        >
          {name}
        </Link>
        <p className="text-sm text-slate-500">
          {brand} · {category}
        </p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-blue-600">
            {formatPrice(price)}
          </span>
          {oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!inStock}
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 cursor-pointer"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

