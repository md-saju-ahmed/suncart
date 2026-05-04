import React from "react";
import Image from "next/image";
import ZaraLogo from "@/assets/zara.png";
import PumaLogo from "@/assets/puma.png";
import LVLogo from "@/assets/louis-vuitton.png";
import SeikoLogo from "@/assets/seiko.png";
import AdidasLogo from "@/assets/adidas.png";
import GucciLogo from "@/assets/gucci.png";
import SectionTitle from "../shared/SectionTitle";
import Container from "../shared/Container";

const brands = [
  { id: 1, logo: ZaraLogo, alt: "Zara" },
  { id: 2, logo: GucciLogo, alt: "Gucci" },
  { id: 3, logo: PumaLogo, alt: "Puma" },
  { id: 4, logo: LVLogo, alt: "Louis Vuitton" },
  { id: 5, logo: SeikoLogo, alt: "Seiko" },
  { id: 6, logo: AdidasLogo, alt: "Adidas" },
];

const TopBrands = () => {
  return (
    <section className="w-full py-5 lg:py-10 animate__animated animate__fadeIn">
      <Container>
        <SectionTitle
          title="Top Brands"
          subtitle="Defining the season with the world's most popular brands."
        />

        <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-6 items-center gap-8 sm:gap-5 max-w-3xl mx-auto">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="shrink-0 w-28 sm:w-full group animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-16 sm:h-18 w-full transition-all duration-300 opacity-50 group-hover:opacity-100 group-hover:scale-105">
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopBrands;