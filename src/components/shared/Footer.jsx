import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import NagadLogo from "@/assets/nagad.png";
import BkashLogo from "@/assets/bkash.png";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-16 pb-8 text-neutral-700">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 pb-12">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Image
              src={Logo}
              alt="SunCart Logo"
              width={110}
              height={36}
              className="opacity-90"
            />
            <p className="text-sm leading-relaxed max-w-xs">
              Modern silhouettes and seasonal essentials crafted for the contemporary lifestyle.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-400 hover:text-[#FF7206]">
                <FaFacebook />
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#FF7206]">
                <FaInstagram />
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#FF7206]">
                <FaTwitter />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Image src={BkashLogo} alt="icon" width={20} height={20} />
              <Image src={NagadLogo} alt="icon" width={20} height={20} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-6">Collection</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#FF7206]">Home</a></li>
              <li><a href="#" className="hover:text-[#FF7206]">Shop</a></li>
              <li><a href="#" className="hover:text-[#FF7206]">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#FF7206]">Best Sellers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-6">Contact</h3>

            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start gap-3">
                <FaLocationDot className="mt-1 text-neutral-400" size={14} />
                <p>Sylhet, Bangladesh</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-neutral-400" size={14} />
                <a href="mailto:support@suncart.com" className="hover:text-[#FF7206]">support@suncart.com</a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-neutral-400" size={14} />
                <a href="tel:+880123456789" className="hover:text-[#FF7206]">+880 1234-56789</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-6">Newsletter</h3>

            <p className="text-sm mb-4">Join our list for exclusive seasonal updates.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border-b border-neutral-200 bg-transparent py-2 text-sm outline-none focus:border-[#FF7206]"
              />
              <button className="text-sm font-bold uppercase text-neutral-900 hover:text-[#FF7206] text-left cursor-pointer">
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm">© 2026 SunCart. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="text-sm hover:text-[#FF7206]">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-[#FF7206]">Terms & Conditions</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;