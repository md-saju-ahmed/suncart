import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const ProductCard = ({ product }) => {
  const displayImage =
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/placeholder.png";

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/40 hover:border-slate-200 hover:-translate-y-1 animate__animated animate__fadeInUp">
      
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-slate-800 shadow-sm border border-white/50 transition-all duration-300 group-hover:scale-105">
          <FaStar className="text-yellow-500" />
          {product.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.brand}
          </span>
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
        </div>

        <h3 className="text-base font-medium text-slate-800 mb-2 line-clamp-1 group-hover:text-black transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-xs leading-relaxed text-slate-500 line-clamp-2 mb-6 font-light">
          {product.description}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-black active:scale-[0.98] hover:shadow-lg"
        >
          View Details
          <HiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;