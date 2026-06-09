"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { useCart } from "@/context/CartContext";
import {
  ArrowUpRight,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    couponCode,
    couponData,
    couponError,
    setCouponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Container className="py-20 flex flex-col items-center gap-6 text-center">
          <ShoppingBag className="text-6xl text-slate-200" />
          <h1 className="text-3xl font-light text-slate-800">
            Your cart is empty
          </h1>
          <p className="text-slate-400 text-sm">
            Looks like you haven&apos;t added anything yet.
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-slate-900">
            Shopping Cart
            <span className="ml-3 text-base font-medium text-slate-400">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-700 underline underline-offset-4 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <Image
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        {item.brand}
                      </p>
                      <h3 className="text-sm sm:text-base font-medium text-slate-800 line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors shrink-0 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                      >
                        <Minus className="text-xs" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                      >
                        <Plus className="text-xs" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <p className="text-base font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          (${item.price} each)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Tag size={12}/>
                  Discount Coupon
                </label>

                {couponData ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        {couponCode}
                      </p>
                      <p className="text-xs text-green-600">
                        {couponData.label} applied!
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-500 hover:text-rose-700 underline transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && applyCoupon(couponCode)
                      }
                      placeholder="Enter coupon code"
                      className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 placeholder:text-slate-300 uppercase"
                    />
                    <button
                      onClick={() => applyCoupon(couponCode)}
                      className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-500">{couponError}</p>
                )}

                <p className="text-[10px] text-slate-400">
                  Try: <span className="font-mono font-bold">SUMMER10</span>
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount ({couponCode})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="flex justify-between text-slate-900 font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-xl text-sm font-medium uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.99]">
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                Continue Shopping
                <ArrowUpRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
