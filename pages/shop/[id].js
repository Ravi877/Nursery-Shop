// pages/shop/[id].js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getProductById, getAllProductIds } from '../../lib/shop';

// Dummy component for a star rating display
function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex items-center text-bright-blue">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
            ))}
            {hasHalfStar && (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27V2Z"/></svg>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current text-gray-600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
            ))}
            <span className="ml-2 text-light-slate text-sm">({rating.toFixed(1)})</span>
        </div>
    );
}

export default function ProductPage({ product }) {
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return <Layout title="Product Not Found"><div className="text-center py-20 text-white">Product Not Found</div></Layout>;
  }

  const isOutOfStock = !product.inStock;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-lightest-slate">Product Overview</h3>
            <p className="text-light-slate">{product.details}</p>
            
            <h3 className="text-2xl font-bold text-lightest-slate pt-4">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-light-slate ml-4">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        );
      case 'included':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-lightest-slate">What's Included in Your Purchase</h3>
            <ul className="list-disc list-inside space-y-2 text-light-slate ml-4">
              {product.what_included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-lightest-slate">Customer Reviews ({product.reviews_count})</h3>
            <div className="flex items-center space-x-4">
                <StarRating rating={product.rating} />
                <span className="text-xl font-bold text-white">{product.rating.toFixed(1)} out of 5 stars</span>
            </div>
            
            <div className="space-y-4 pt-4">
                {/* Dummy Review 1 */}
                <div className="p-4 bg-gray-800/30 rounded-lg border border-white/10">
                    <StarRating rating={5} />
                    <p className="text-lightest-slate mt-2 italic">"Transformed my budget in a week! The templates are incredibly useful and simple to follow."</p>
                    <p className="text-xs text-gray-500 mt-2">- Anonymous User M. (Verified Purchase)</p>
                </div>
                {/* Dummy Review 2 */}
                <div className="p-4 bg-gray-800/30 rounded-lg border border-white/10">
                    <StarRating rating={4} />
                    <p className="text-lightest-slate mt-2 italic">"Great content, though I wish there were a few more advanced topics covered."</p>
                    <p className="text-xs text-gray-500 mt-2">- TechGuru2025</p>
                </div>
            </div>
            <button className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Write a Review
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout title={product.name} description={product.description}>
      <article className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-bright-blue/30">
            <Image 
              src={product.image || '/images/default-product.jpg'} 
              alt={product.name} 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${isOutOfStock ? 'grayscale' : ''}`}
              priority 
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-bright-blue/20 text-bright-blue">
              {product.category}
            </span>
            <h1 className="text-5xl font-extrabold text-lightest-slate">{product.name}</h1>
            
            {/* Rating Section */}
            <div className="flex items-center space-x-4">
                <StarRating rating={product.rating} />
                <span className="text-light-slate text-lg">({product.reviews_count} Reviews)</span>
            </div>

            <p className="text-xl text-light-slate">{product.description}</p>
            
            <div className="border-t border-b border-white/10 py-4">
              <span className="text-5xl font-extrabold text-bright-blue">${product.price.toFixed(2)}</span>
            </div>

            {/* CTA Button */}
            <button
              disabled={isOutOfStock}
              className={`w-full py-4 text-lg font-bold rounded-lg transition-all duration-300 uppercase tracking-widest ${
                isOutOfStock
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-bright-blue text-dark-navy hover:scale-[1.02] hover:shadow-lg hover:shadow-bright-blue/30'
              }`}
            >
              {isOutOfStock ? 'SOLD OUT' : 'Add to Cart'}
            </button>
            {isOutOfStock && (
                 <p className="text-center text-red-400 font-semibold">This item is currently out of stock.</p>
            )}

            {/* Back Link */}
            <div className="mt-8 text-center pt-8">
              <Link href="/shop" className="text-light-slate font-medium hover:text-bright-blue transition-colors">
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Content Tabs */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex space-x-8 border-b border-white/10 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 px-1 font-semibold transition-colors ${
                activeTab === 'details' 
                  ? 'text-bright-blue border-b-2 border-bright-blue' 
                  : 'text-light-slate hover:text-white'
              }`}
            >
              Details & Features
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`py-3 px-1 font-semibold transition-colors ${
                activeTab === 'included' 
                  ? 'text-bright-blue border-b-2 border-bright-blue' 
                  : 'text-light-slate hover:text-white'
              }`}
            >
              What's Included
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 px-1 font-semibold transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-bright-blue border-b-2 border-bright-blue' 
                  : 'text-light-slate hover:text-white'
              }`}
            >
              Reviews
            </button>
          </div>
          
          <div className="bg-gray-800/30 p-8 rounded-lg">
             {renderTabContent()}
          </div>
        </div>

      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllProductIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  return {
    props: {
      product,
    },
  };
}