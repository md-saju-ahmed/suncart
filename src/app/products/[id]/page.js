"use client";
import { use } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import NotFound from "@/app/not-found";
import Container from "@/components/shared/Container";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find((item) => item.id === Number(resolvedParams.id));

  if (!product) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 animate__animated animate__fadeIn">

      <Container className="py-8 md:py-16">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

          {/* Product Image Section */}
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

          {/* Product Details Section */}
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
                  <dd className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
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

              <div className="space-y-4 pt-6">

                <button className="w-full bg-black py-5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-[0.99]">
                  Add To Bag
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
                  <span className="transition-transform group-open:rotate-180">+</span>
                </summary>

                <p className="pt-4 text-sm leading-relaxed text-gray-500">
                  Standard shipping takes 3-5 business days. We offer a 30-day return policy for all unused items in their original packaging.
                </p>
              </details>

            </div>
          </div>

        </div>

      </Container>
    </main>
  );
}