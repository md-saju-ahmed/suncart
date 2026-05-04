import products from "@/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const ProductsPage = () => {
  return (
    <main className="w-full py-5 lg:py-10">
      <Container>
        <SectionTitle
          title={"All Products"}
          subtitle={"Explore our latest summer essentials collection including sunglasses, skincare, beach accessories, and more."}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </Container>
    </main>
  );
};

export default ProductsPage;