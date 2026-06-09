"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FaStar } from "react-icons/fa";
import { ArrowUpRight, Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();

  const displayImage = product.image && product.image.trim() !== "" ? product.image : "/images/placeholder.png";
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/40 hover:border-slate-200 hover:-translate-y-1 animate__animated animate__fadeInUp">

      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-slate-800 shadow-sm border border-white/50 transition-all duration-300 group-hover:scale-105">
          <FaStar className="text-yellow-500" />
          {product.rating}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${wishlisted
            ? "bg-rose-500 border-rose-500 text-white scale-110"
            : "bg-white/80 backdrop-blur-md border-white/50 text-slate-500 hover:bg-rose-50 hover:text-rose-500"
            }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`text-sm ${wishlisted ? "fill-white" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.brand}
          </span>
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
        </div>

        <h3 className="text-base font-medium text-slate-800 mb-2 line-clamp-1 group-hover:text-black transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-xs leading-relaxed text-slate-500 line-clamp-2 mb-4 font-light">
          {product.description}
        </p>

        <div className="flex gap-2">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.98] ${inCart
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-slate-900 text-white hover:bg-black hover:shadow-lg"
              }`}
          >
            <ShoppingCart className="text-base" />
            {inCart ? "In Cart" : "Add to Cart"}
          </button>

          {/* View Details */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center w-11 h-11 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            aria-label="View details"
          >
            <ArrowUpRight className="text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
