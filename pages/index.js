import Head from 'next/head';
import { useMemo, useState } from 'react';
import { Leaf, Menu, MessageCircle, Phone, ShoppingBag, X } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Ficus Bonsai (10 Years)',
    category: 'Bonsai',
    price: 4500,
    tag: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Hybrid Yellow Rose',
    category: 'Flowering Plants',
    price: 350,
    tag: 'New',
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Orchid Ceramic Pot',
    category: 'Indoor Plants',
    price: 1200,
    tag: 'Popular',
    image:
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Snake Plant',
    category: 'Indoor Plants',
    price: 650,
    image:
      'https://images.unsplash.com/photo-1593691509543-c55fb32a5a5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Areca Palm',
    category: 'Outdoor Plants',
    price: 900,
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Peace Lily',
    category: 'Indoor Plants',
    price: 780,
    image:
      'https://images.unsplash.com/photo-1587070181569-6a2f6f0a188f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Jade Succulent Set',
    category: 'Succulents',
    price: 980,
    image:
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Hanging Money Plant',
    category: 'Hanging Plants',
    price: 540,
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
  },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(
    () => PRODUCTS.filter((product) => activeCategory === 'All' || product.category === activeCategory),
    [activeCategory]
  );

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleCheckout = () => {
    if (!cart.length) return;

    const lines = cart
      .map((item, index) => `${index + 1}. ${item.name} × ${item.qty} = ₹${item.price * item.qty}`)
      .join('%0A');

    const message = `Hi Verdant Vibes!%0A%0AI would like to place an order:%0A${lines}%0A%0ATotal: ₹${cartTotal}%0APlease confirm availability and delivery.`;

    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <>
      <Head>
        <title>Verdant Vibes | Premium Nursery Shop</title>
        <meta
          name="description"
          content="Modern nursery shop website with a responsive plant catalog, basket, and WhatsApp checkout."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-lime-50 to-white text-slate-800">
        <header className="sticky top-0 z-40 border-b border-emerald-100/70 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="#" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-emerald-600" />
              <span className="text-xl font-extrabold text-emerald-700">
                Verdant<span className="text-amber-700">Vibes</span>
              </span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              <a href="#shop" className="font-medium text-slate-600 hover:text-emerald-700">Shop</a>
              <a href="#why-us" className="font-medium text-slate-600 hover:text-emerald-700">Why Us</a>
              <a href="tel:+919999999999" className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                <Phone size={16} /> +91 99999 99999
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full bg-emerald-600 p-2.5 text-white shadow hover:bg-emerald-700"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="rounded-md p-2 md:hidden" onClick={() => setIsMenuOpen((v) => !v)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="border-t border-emerald-100 bg-white px-4 py-3 md:hidden">
              <a href="#shop" className="block py-2 font-medium text-slate-700">Shop</a>
              <a href="#why-us" className="block py-2 font-medium text-slate-700">Why Us</a>
              <a href="tel:+919999999999" className="block py-2 font-medium text-emerald-700">Call: +91 99999 99999</a>
            </div>
          )}
        </header>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              Fresh plants • Fast delivery • Expert support
            </p>
            <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              A modern nursery shop for every home and office.
            </h1>
            <p className="mb-7 text-lg text-slate-600">
              Discover healthy plants, stylish pots, and green gifting options. Add items to basket and order instantly on WhatsApp.
            </p>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
              Start Shopping
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80"
              alt="Nursery plants"
              className="h-[280px] w-full object-cover sm:h-[380px]"
            />
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
                  {product.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">{product.category}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-emerald-700">₹{product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why-us" className="border-y border-emerald-100 bg-white/80 py-14">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <h4 className="font-bold text-emerald-800">Healthy Plants</h4>
              <p className="text-sm text-slate-600">Curated nursery stock with care instructions.</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5">
              <h4 className="font-bold text-emerald-800">Same Day Dispatch</h4>
              <p className="text-sm text-slate-600">Quick packaging and local delivery support.</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5">
              <h4 className="font-bold text-emerald-800">WhatsApp Ordering</h4>
              <p className="text-sm text-slate-600">Simple checkout flow for mobile and desktop users.</p>
            </div>
          </div>
        </section>

        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
            <aside className="flex h-full w-full max-w-md flex-col bg-white">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-bold">Your Basket ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="rounded-md p-1.5 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Your basket is empty. Add some beautiful plants 🌿</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-500">₹{item.price} each</p>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
                          <button className="rounded px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span className="text-sm font-semibold">{item.qty}</span>
                          <button className="rounded px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <p className="font-bold text-emerald-700">₹{item.qty * item.price}</p>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4">
                  <p className="mb-3 flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white hover:opacity-90"
                  >
                    <MessageCircle size={18} /> Order on WhatsApp
                  </button>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
