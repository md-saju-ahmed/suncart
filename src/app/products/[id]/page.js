"use client";
import { use, useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import NotFound from "@/app/not-found";
import Container from "@/components/shared/Container";
import { useCart } from "@/context/CartContext";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find(
    (item) => item.id === Number(resolvedParams.id),
  );

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const wishlisted = isInWishlist(product.id);
  const cartItem = cartItems.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    // Add once per click with current qty
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 animate__animated animate__fadeIn">
      <Container className="py-8 md:py-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Product Image */}
          <div className="lg:col-span-7 animate__animated animate__fadeInUp">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50 rounded-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 animate__animated animate__fadeInUp">
            <div className="sticky top-24 space-y-8">
              <header className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                    {product.brand}
                  </p>
                  <h1 className="text-4xl font-light leading-tight tracking-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-2xl font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating}</span>
                    <span className="mx-1">•</span>
                    <span className="underline cursor-pointer">
                      {product.reviews} reviews
                    </span>
                  </div>
                </div>
              </header>

              <div className="h-px w-full bg-gray-100" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Details
                </h3>
                <dl className="grid grid-cols-2 gap-y-3 text-sm border-t border-gray-50 pt-4">
                  <dt className="text-gray-400">Category</dt>
                  <dd className="capitalize">{product.category}</dd>
                  <dt className="text-gray-400">Stock Status</dt>
                  <dd
                    className={
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </dd>
                  {product.specs &&
                    Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="contents">
                        <dt className="text-gray-400">{key}</dt>
                        <dd>{val}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              <div className="space-y-4 pt-4">
                {/* Quantity Selector */}
                {!cartItem && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold">
                        {qty}
                      </span>
                      <button
                        onClick={() =>
                          setQty((q) => Math.min(product.stock, q + 1))
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Already in Cart */}
                {cartItem && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-600 font-medium">
                      In your cart
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, cartItem.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add to Cart / Go to Cart */}
                {cartItem ? (
                  <Link
                    href="/cart"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 py-5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-green-700 active:scale-[0.99]"
                  >
                    <ShoppingCart />
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full flex items-center justify-center gap-2 bg-black py-5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart />
                    Add to Cart
                  </button>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-medium uppercase tracking-widest border transition-all active:scale-[0.99] ${
                    wishlisted
                      ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={wishlisted ? "fill-rose-500 text-rose-500" : ""}
                  />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>

                <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-tighter text-gray-400 text-center">
                  <div className="flex items-center justify-center gap-2 border border-gray-100 py-2">
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 border border-gray-100 py-2">
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>

              <details className="group border-t border-gray-100 pt-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium uppercase tracking-wider list-none">
                  Shipping & Returns
                  <span className="transition-transform group-open:rotate-180">
                    +
                  </span>
                </summary>
                <p className="pt-4 text-sm leading-relaxed text-gray-500">
                  Standard shipping takes 3-5 business days. We offer a 30-day
                  return policy for all unused items in their original
                  packaging.
                </p>
              </details>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
