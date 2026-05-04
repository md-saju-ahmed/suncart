import Container from "@/components/shared/Container";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <Container>
        <div className="flex flex-col items-center text-center animate__animated animate__fadeInUp">
          <span className="text-[10rem] md:text-[14rem] font-medium leading-none text-neutral-100 animate__animated animate__pulse animate__slow">
            404
          </span>

          <div className="relative mt-8 z-10 animate__animated animate__fadeInUp animate__delay-1s">
            <h1 className="text-2xl md:text-3xl tracking-tight text-neutral-900">
              Lost in <span className="font-semibold italic">Summer</span>
            </h1>

            <p className="mt-4 max-w-sm text-neutral-500 text-sm md:text-base leading-relaxed">
              The page you are looking for has been moved or no longer exists in our current collection.
            </p>

            <div className="mt-10 flex justify-center">
              <Link href="/">
                <button className="group flex items-center gap-3 px-8 py-3 rounded-full border border-neutral-200 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white cursor-pointer hover:scale-[1.02] duration-300">
                  <FaArrowLeft />
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;