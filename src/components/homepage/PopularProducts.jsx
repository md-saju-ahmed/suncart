import React from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import SectionTitle from "../shared/SectionTitle";
import Container from "../shared/Container";

const PopularProducts = () => {
  const popular = products.slice(0, 3);

  return (
    <section className="w-full py-5 lg:py-10 animate__animated animate__fadeIn">
      <Container>
        <SectionTitle
          title={"Popular Products"}
          subtitle={"Our most-loved styles, back in high demand."}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {popular.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularProducts;