// pages/shop/index.js
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllProducts } from '../../lib/shop'; 
import ProductCard from '../../components/ProductCard'; 

// ... (omitted unnecessary logic for brevity)

export default function ShopIndex({ products }) {
  const [sort, setSort] = useState('price-asc');

  const categories = ['All', 'E-Books', 'Software', 'Tools & Templates'];
  const [activeCategory, setActiveCategory] = useState('All');

  let filteredAndSortedProducts = products.filter(product => 
    activeCategory === 'All' || product.category === activeCategory
  );

  switch (sort) {
    case 'price-asc':
      filteredAndSortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredAndSortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filteredAndSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return (
    <Layout title="Digital Shop" description="Browse digital products on finance, tech, and productivity.">
      <div className="min-h-screen bg-dark-navy text-lightest-slate py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-lightest-slate mb-4">
              The Digital Mind Shop
            </h1>
            <p className="text-xl text-light-slate">
              Premium digital assets and tools for the future-focused professional.
            </p>
          </header>

          {/* Controls: Category & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 p-6 bg-gray-800/50 rounded-lg">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors 
                    ${activeCategory === category 
                      ? 'bg-bright-blue text-dark-navy' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="py-2 px-4 rounded-lg bg-gray-800 text-lightest-slate border border-white/20 focus:ring-bright-blue focus:border-bright-blue"
            >
              <option value="price-asc">Sort by Price: Low to High</option>
              <option value="price-desc">Sort by Price: High to Low</option>
              <option value="name-asc">Sort by Name: A-Z</option>
            </select>
          </div>
          
          {/* Products Grid */}
          <h2 className="text-3xl font-bold text-lightest-slate mb-8 border-l-4 border-bright-blue pl-4">
            Products ({filteredAndSortedProducts.length})
          </h2>
          {/* UPDATED GRID: Show 4 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <p className="text-center text-light-slate text-xl mt-12">
              No products match your current filters.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const products = getAllProducts();
  return {
    props: {
      products,
    },
  };
}