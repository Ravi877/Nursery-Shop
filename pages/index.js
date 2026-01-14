import { useState } from 'react';
import Head from 'next/head';
import { ShoppingBag, X, MessageCircle, Phone, Leaf } from 'lucide-react';

// --- STABLE IMAGE DATA (NO BROKEN LINKS) ---
const PRODUCTS = [
  { 
    id: 1, 
    name: 'Ficus Bonsai (10yr)', 
    category: 'Bonsai', 
    price: 4500, 
    tag: 'Best Seller',
    image: 'https://green-bonsai.com/cdn/shop/articles/Ficus_Retusa_on_a_Table_1000x.jpg?v=1681245209'
  },
  { 
    id: 2, 
    name: 'Hybrid Rose (Yellow)', 
    category: 'Hybrid Plants', 
    price: 350, 
    tag: 'New',
    image: 'https://www.davidaustinroses.co.uk/cdn/shop/products/c3313248d2c44b6eaed6d3bf0c5057ed_245584cd-702f-4017-9ff1-1894da21fda2.jpg?v=1595547273&width=900'
  },
  { 
    id: 3, 
    name: 'Artificial Orchid Pot', 
    category: 'Artificial', 
    price: 1200,
    image: 'data:image/jpeg;base64,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'
  },
  { 
    id: 4, 
    name: 'Areca Palm (6ft)', 
    category: 'Trees', 
    price: 2800,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXUhfLGOnhWJDS1LQQACv-gAbqTivJ3v6Hw&s'
  },
  { 
    id: 5, 
    name: 'Snake Plant', 
    category: 'Real Plants', 
    price: 450, 
    tag: 'Air Purifier',
    image: 'https://lh5.googleusercontent.com/proxy/lkBhfORb2cxfHMkHc26-cBN6ylDnihUVKUluv56xKMDMbrihyxE8O2nHn-0ZGWUcvJ5rjfx_dDgzMIrVKqfSDaSeGD1dnWjVX71J3l-aTSQs'
  },
  { 
    id: 6, 
    name: 'Juniper Bonsai', 
    category: 'Bonsai', 
    price: 3200,
    image: 'https://www.bonsaiempire.com/images/carrousel/Juniper01.jpg'
  },
  { 
    id: 7, 
    name: 'Premium Artificial Fern', 
    category: 'Artificial', 
    price: 890,
    image: 'https://m.media-amazon.com/images/I/81aYkY-KRlL.jpg'
  },
  { 
    id: 8, 
    name: 'Mango Hybrid Sapling', 
    category: 'Hybrid Plants', 
    price: 600,
    image: 'https://m.media-amazon.com/images/I/610qhj+ycwL._AC_UF1000,1000_QL80_.jpg'
  },
];

const CATEGORIES = ['All', 'Bonsai', 'Real Plants', 'Artificial', 'Hybrid Plants', 'Trees'];

export default function NurseryShop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!cart.length) return;

    let message = "Hi! I would like to order:\n\n";
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
    });
    message += `\nTotal Estimate: ₹${cartTotal}`;
    message += "\n\nPlease confirm availability.";

    window.open(
      `https://wa.me/919999999999?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-nature-cream text-gray-800">
      <Head>
        <title>Verdant Vibes - Bangalore's Premium Nursery</title>
      </Head>

      {/* NAV */}
      <nav className="fixed w-full z-50 bg-nature-cream/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-nature-green w-8 h-8" />
            <span className="text-2xl font-bold text-nature-green">
              Verdant<span className="text-nature-brown">Vibes</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:flex items-center gap-2">
              <Phone size={18} /> +91 999-999-9999
            </button>
            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
              <ShoppingBag className="w-7 h-7 text-nature-green" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-nature-brown text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-32 pb-20 px-6 bg-nature-light">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-bold text-nature-green mb-6">
              Bring the Soul of Nature Home
            </h1>
            <p className="text-gray-600 mb-8">
              Premium plants delivered across Bangalore.
            </p>
            <button
              onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
              className="bg-nature-green text-white px-8 py-4 rounded-full"
            >
              Explore Collection
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://cdn1.npcdn.net/images/1761297483BuUPFq6f38ad24a67be7dbbb42266f0efa1926.jpeg?md5id=013e7eede60069b472064b3e9a46455f&new_width=1600&new_height=1600&size=max&w=-62170008925&type=11&off_wm=1"
              alt="Nursery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* SHOP */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full ${
                activeCategory === cat
                  ? 'bg-nature-green text-white'
                  : 'bg-white border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl p-4 shadow hover:shadow-xl">
              <div className="h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-nature-green">₹{product.price}</span>
                <button onClick={() => addToCart(product)}>
                  <ShoppingBag />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="w-full max-w-md bg-white h-full flex flex-col">
            <div className="p-4 flex justify-between border-b">
              <h2 className="font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>
            <div className="flex-1 p-4 space-y-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <img src={item.image} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-bold">{item.name}</p>
                    <p>₹{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(i)}><X /></button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <p className="font-bold mb-3">Total: ₹{cartTotal}</p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] text-white py-3 rounded"
                >
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
