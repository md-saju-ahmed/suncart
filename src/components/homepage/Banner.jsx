import React from "react";
import Image from "next/image";
import BannerImage from "@/assets/banner.jpg";
import { FaArrowRight } from "react-icons/fa";
import Container from "../shared/Container";

const Banner = () => {
  return (
    <section className="w-full py-5 lg:py-10">
      <Container>
        <div className="relative min-h-125 w-full overflow-hidden rounded-3xl bg-neutral-900 flex items-center justify-center animate__animated animate__fadeIn">
          <Image
            src={BannerImage}
            alt="Summer sale collection"
            fill
            priority
            className="object-cover opacity-70"
          />

          <div className="relative z-20 w-full px-8 py-16 text-center text-white animate__animated animate__fadeInUp animate__delay-1s">
            <div className="max-w-3xl mx-auto">
              <p className="mb-4 text-sm font-bold tracking-[0.2em] uppercase text-orange-400 animate__animated animate__fadeInDown">
                Hot Deals 🔥
              </p>

              <h1 className="mb-6 text-5xl font-light tracking-tight sm:text-6xl md:text-7xl">
                Summer <span className="font-serif italic">Sale</span>
              </h1>

              <div className="mb-8 flex flex-col items-center justify-center gap-2">
                <span className="text-2xl font-medium tracking-wide">
                  50% OFF
                </span>
                <div className="h-px w-12 bg-white/40" />
                <p className="max-w-md text-sm text-white/80 font-light leading-relaxed">
                  Refresh your wardrobe with our seasonal finale. Lightweight silhouettes for effortless living.
                </p>
              </div>

              <div className="flex justify-center">
                <a
                  href="#new-arrivals"
                  className="group flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-semibold text-black transition-all hover:bg-neutral-100 hover:shadow-lg hover:scale-[1.02] duration-300"
                >
                  Shop Now
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;