import Link from "next/link";
import products from "@/data/products.json";
import ProductCard from "../products/ProductCard";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { HiArrowUpRight } from "react-icons/hi2";

const NewArrivals = () => {
  const newProducts = products.slice(0, 6);

  return (
    <section
      className="w-full py-5 lg:py-10 animate__animated animate__fadeIn"
      id="new-arrivals"
    >
      <Container>
        <SectionTitle
          title="New Arrivals"
          subtitle="Just landed: Modern essentials for the contemporary wardrobe."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            href="/products"
            className="group flex items-center gap-2 px-8 py-3 border border-slate-200 rounded-full text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 hover:scale-[1.03]"
          >
            View All Products
            <HiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NewArrivals;