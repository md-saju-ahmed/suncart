"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { useCart } from "@/context/CartContext";
import { ArrowUpRight, Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Container className="py-20 flex flex-col items-center gap-6 text-center">
          <Heart size={60} className="text-slate-200" />
          <h1 className="text-3xl font-light text-slate-800">
            Your wishlist is empty
          </h1>
          <p className="text-slate-400 text-sm">
            Save items you love and come back to them later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-all"
          >
            Browse Products
            <ArrowUpRight />
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 animate__animated animate__fadeIn">
      <Container className="py-10">
        <h1 className="text-3xl font-light text-slate-900 mb-8">
          Wishlist
          <span className="ml-3 text-base font-medium text-slate-400">
            ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
                  <Image
                    src={product.image || "/images/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {product.brand}
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      ${product.price}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-slate-800 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                        inCart
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-slate-900 text-white hover:bg-black"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors"
                      aria-label="View details"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
