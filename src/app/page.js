import Banner from "@/components/homepage/Banner";
import PopularProducts from "@/components/homepage/PopularProducts";
import SummerCare from "@/components/homepage/SummerCare";
import TopBrands from "@/components/homepage/TopBrands";
import NewArrivals from "@/components/homepage/NewArrivals";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularProducts />
      <SummerCare />
      <TopBrands />
      <NewArrivals />
    </>
  );
}