import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "SunCart",
  description: "Explore Summer Essentials Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="h-full antialiased">
      <body
        className={`${geistSans.className} min-h-full flex flex-col scroll-smooth animate__animated animate__fadeIn`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer position="top-right" autoClose={1000} />
        </CartProvider>
      </body>
    </html>
  );
}
