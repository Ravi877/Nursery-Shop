// components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const isOutOfStock = !product.inStock;

  return (
    <Link href={`/shop/${product.id}`} className="group block h-full">
      <div 
        className={`flex flex-col h-full bg-gray-800/40 rounded-lg overflow-hidden shadow-xl border transition-all duration-300
        ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'border-white/10 hover:border-bright-blue hover:shadow-[0_0_20px_#00bfff20]'}
        `}
      >
        {/* REDUCED IMAGE HEIGHT from h-56 to h-40 */}
        <div className="relative w-full h-40 overflow-hidden"> 
          <Image
            src={product.image || '/images/default-product.jpg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'grayscale' : ''}`}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <span className="text-white text-xl font-bold uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        {/* REDUCED PADDING for a compact look */}
        <div className="p-4 flex flex-col flex-grow"> 
          <h3 className="text-lg font-bold text-lightest-slate mb-1 line-clamp-2 group-hover:text-bright-blue transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-light-slate mb-3 flex-grow line-clamp-3">
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-xl font-extrabold text-bright-blue">
              ${product.price.toFixed(2)}
            </span>
            <button
              disabled={isOutOfStock}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                isOutOfStock 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-bright-blue text-dark-navy hover:bg-bright-blue/80'
              }`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}