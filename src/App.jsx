import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react'
import {
  addToCart,
  clearCart,
  fetchProducts,
  login,
  logout,
  removeFromCart,
  resetFilters,
  setCartOpen,
  setFilter,
  toggleWishlist,
  updateQuantity,
} from './store'
import { products as fallbackProducts } from './data/products'

const money = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

function App() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-ink">
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0))
  const wishlistCount = useSelector((state) => state.wishlist.items.length)
  const user = useSelector((state) => state.auth.user)
  const navItems = [
    ['/', 'Shop'],
    ['/wishlist', 'Wishlist'],
    ['/checkout', 'Checkout'],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-semibold sm:px-6 lg:px-8">
          <span>Free delivery above Rs. 2,999</span>
          <span className="hidden sm:inline">Secure checkout | Easy returns | 24/7 support</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2 font-black tracking-wide text-brand-700">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-brand-700 text-white shadow-sm">NC</span>
          <span className="hidden text-xl min-[390px]:inline">NexaCart</span>
        </Link>
        <div className="mx-4 hidden max-w-xl flex-1 lg:block">
          <SearchBox compact />
        </div>
        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-bold ${isActive ? 'text-brand-700' : 'text-slate-600'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden h-10 items-center gap-2 rounded border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:border-brand-500 md:flex"
          >
            <User size={17} />
            {user ? user.name.split(' ')[0] : 'Login'}
          </Link>
          {user && (
            <button onClick={() => dispatch(logout())} className="hidden h-10 rounded border border-slate-200 px-3 text-sm font-bold md:block">
              Logout
            </button>
          )}
          <IconLink to="/wishlist" label="Wishlist" count={wishlistCount}>
            <Heart size={20} />
          </IconLink>
          <button
            aria-label="Open cart"
            onClick={() => dispatch(setCartOpen(true))}
            className="relative grid h-10 w-10 place-items-center rounded border border-slate-200 bg-white hover:border-brand-500"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded border border-slate-200 md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className="font-semibold text-slate-700">
                {label}
              </NavLink>
            ))}
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="font-semibold text-slate-700">
              {user ? user.email : 'Login / Register'}
            </Link>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Grocery'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    dispatch(setFilter({ category }))
                    setMenuOpen(false)
                  }}
                  className="rounded border border-slate-200 px-3 py-2 text-left text-sm font-bold text-slate-600"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="hidden border-t border-slate-100 bg-white md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-sm font-bold text-slate-600 sm:px-6 lg:px-8">
          {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Grocery'].map((category) => (
            <button key={category} onClick={() => dispatch(setFilter({ category }))} className="hover:text-brand-700">
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

function IconLink({ to, label, count, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded border border-slate-200 bg-white hover:border-brand-500"
    >
      {children}
      {count > 0 && <Badge>{count}</Badge>}
    </Link>
  )
}

function Badge({ children }) {
  return <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{children}</span>
}

function HomePage() {
  const dispatch = useDispatch()
  const { items, status, error, filters } = useSelector((state) => state.products)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch, filters])

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:hidden">
          <SearchBox />
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 pt-2 sm:px-6 lg:grid-cols-[1.55fr_0.75fr] lg:px-8 lg:py-6">
          <div className="relative overflow-hidden rounded border border-slate-200 bg-ink text-white">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=80"
              alt="Curated online shopping collection"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="relative max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">New season drop</p>
              <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Everyday essentials, delivered fast.</h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-100 sm:text-base">
                Shop curated electronics, fashion, home, beauty, sports, and grocery picks with fast checkout and saved carts.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex h-11 items-center gap-2 rounded bg-white px-5 text-sm font-black text-ink"
                >
                  Shop deals <ChevronRight size={17} />
                </button>
                <button onClick={() => dispatch(setFilter({ rating: 4.5 }))} className="h-11 rounded border border-white/40 px-5 text-sm font-black text-white">
                  Top rated
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <PromoCard title="Weekend Sale" text="Up to 35% off selected products" action="View offers" />
            <PromoCard title="Express Delivery" text="Priority dispatch on prepaid orders" action="Learn more" muted />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 px-4 pb-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <TrustItem icon={<Truck size={19} />} title="Fast delivery" text="2-4 day dispatch" />
          <TrustItem icon={<ShieldCheck size={19} />} title="Buyer protection" text="Safe payments" />
          <TrustItem icon={<PackageCheck size={19} />} title="Easy returns" text="7-day return window" />
          <TrustItem icon={<CreditCard size={19} />} title="Flexible payments" text="UPI, card, COD" />
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.15em] text-brand-700">Catalog</p>
            <h2 className="text-2xl font-black text-ink">Recommended Products</h2>
          </div>
          <div className="hidden flex-1 lg:block" />
          <button
            onClick={() => setShowFilters((value) => !value)}
            className="flex h-11 items-center justify-center gap-2 rounded bg-brand-700 px-4 font-bold text-white lg:hidden"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar />
          </aside>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-slate-600">{status === 'loading' ? 'Loading products...' : `${items.length} products found`}</p>
              <select
                value={filters.sort}
                onChange={(event) => dispatch(setFilter({ sort: event.target.value }))}
                className="h-11 rounded border border-slate-200 bg-white px-3 font-semibold"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
            {error && <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {status === 'loading'
                ? Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
                : items.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            {status !== 'loading' && items.length === 0 && <EmptyState title="No products match these filters" action="Reset filters" onClick={() => dispatch(resetFilters())} />}
          </div>
        </div>
      </section>
    </>
  )
}

function PromoCard({ title, text, action, muted = false }) {
  return (
    <div className={`rounded border p-5 ${muted ? 'border-slate-200 bg-slate-50' : 'border-brand-100 bg-brand-50'}`}>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-coral">{title}</p>
      <h3 className="mt-2 text-2xl font-black text-ink">{text}</h3>
      <button className="mt-4 inline-flex items-center gap-1 text-sm font-black text-brand-700">
        {action} <ChevronRight size={16} />
      </button>
    </div>
  )
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded border border-slate-200 bg-white p-4">
      <span className="grid h-10 w-10 place-items-center rounded bg-brand-50 text-brand-700">{icon}</span>
      <div>
        <p className="font-black">{title}</p>
        <p className="text-sm font-semibold text-slate-500">{text}</p>
      </div>
    </div>
  )
}

function SearchBox({ compact = false }) {
  const dispatch = useDispatch()
  const search = useSelector((state) => state.products.filters.search)

  return (
    <label className="relative block w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
      <input
        value={search}
        onChange={(event) => dispatch(setFilter({ search: event.target.value }))}
        className={`${compact ? 'h-10' : 'h-12'} w-full rounded border border-slate-200 bg-slate-50 pl-10 pr-4 font-medium outline-none ring-brand-500 focus:bg-white focus:ring-2`}
        placeholder="Search products"
      />
    </label>
  )
}

function FilterSidebar() {
  const dispatch = useDispatch()
  const { categories, filters } = useSelector((state) => state.products)
  const allCategories = ['All', ...categories]

  return (
    <div className="sticky top-36 rounded border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-black">Filters</h2>
        <button onClick={() => dispatch(resetFilters())} className="text-sm font-bold text-brand-700">
          Reset
        </button>
      </div>
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Category</p>
          <div className="grid gap-2">
            {allCategories.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="radio"
                  checked={filters.category === category}
                  onChange={() => dispatch(setFilter({ category }))}
                  className="accent-brand-600"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Price up to {money(filters.maxPrice)}</p>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={filters.maxPrice}
            onChange={(event) => dispatch(setFilter({ maxPrice: Number(event.target.value) }))}
            className="w-full accent-brand-600"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Minimum rating</p>
          <div className="grid grid-cols-2 gap-2">
            {[0, 4, 4.5, 4.7].map((rating) => (
              <button
                key={rating}
                onClick={() => dispatch(setFilter({ rating }))}
                className={`rounded border px-3 py-2 text-sm font-bold ${
                  filters.rating === rating ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {rating === 0 ? 'Any' : `${rating}+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const wished = wishlist.some((item) => item.id === product.id)
  const discount = Math.max(1, Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100))

  return (
    <article className="group overflow-hidden rounded border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-slate-100">
          <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded bg-white/95 px-2 py-1 text-xs font-black text-mint shadow-sm">{discount}% OFF</span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">{product.category}</p>
            <Link to={`/product/${product.id}`} className="mt-1 line-clamp-2 min-h-12 font-black hover:text-brand-700">
              {product.title}
            </Link>
          </div>
          <button
            aria-label="Toggle wishlist"
            onClick={() => dispatch(toggleWishlist(product))}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded border ${
              wished ? 'border-coral bg-red-50 text-coral' : 'border-slate-200 text-slate-500'
            }`}
          >
            <Heart size={19} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-sm font-black text-amber-700">
            <Star size={15} fill="currentColor" />
            {product.rating}
          </div>
          <span className="text-xs font-bold text-slate-400">{product.stock} in stock</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xl font-black">{money(product.price)}</p>
            <p className="text-sm font-semibold text-slate-400 line-through">{money(product.originalPrice)}</p>
          </div>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-black text-slate-600">Deal</span>
        </div>
        <button onClick={() => dispatch(addToCart(product))} className="mt-4 h-11 w-full rounded bg-ink font-black text-white hover:bg-brand-700">
          Add to Cart
        </button>
      </div>
    </article>
  )
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded border border-slate-200 bg-white">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="h-5 w-4/5 rounded bg-slate-200" />
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="h-11 rounded bg-slate-200" />
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const catalog = useSelector((state) => state.products.items)
  const product = [...catalog, ...fallbackProducts].find((item) => String(item.id) === id)

  if (!product) return <EmptyPage title="Product not found" />

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
      <div className="rounded border border-slate-200 bg-white p-3">
        <img src={product.image} alt={product.title} className="aspect-square w-full rounded object-cover" />
      </div>
      <div className="flex flex-col justify-center rounded border border-slate-200 bg-white p-6">
        <p className="font-bold uppercase tracking-[0.18em] text-brand-600">{product.category}</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">{product.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-3xl font-black">{money(product.price)}</span>
          <span className="font-semibold text-slate-400 line-through">{money(product.originalPrice)}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 font-bold text-amber-600">
          <Star size={18} fill="currentColor" />
          {product.rating} rating
        </div>
        <div className="mt-6 grid gap-3 rounded bg-slate-50 p-4 text-sm font-semibold text-slate-600 sm:grid-cols-3">
          <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-mint" /> In stock</span>
          <span className="flex items-center gap-2"><Truck size={17} className="text-brand-700" /> Fast delivery</span>
          <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-brand-700" /> Secure order</span>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => dispatch(addToCart(product))} className="h-12 rounded bg-ink px-6 font-black text-white hover:bg-brand-700">
            Add to Cart
          </button>
          <button onClick={() => dispatch(toggleWishlist(product))} className="h-12 rounded border border-slate-300 px-6 font-black text-slate-700">
            Save to Wishlist
          </button>
        </div>
      </div>
    </section>
  )
}

function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist.items)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black">Wishlist</h1>
      {wishlist.length === 0 ? (
        <EmptyState title="Your wishlist is empty" action="Browse products" to="/" />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

function CartDrawer() {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state) => state.cart)
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 149
  const total = subtotal + shipping

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button
        aria-label="Close cart overlay"
        onClick={() => dispatch(setCartOpen(false))}
        className={`absolute inset-0 bg-slate-950/35 transition ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md transform flex-col bg-white shadow-soft transition duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-black">Shopping Cart</h2>
          <button onClick={() => dispatch(setCartOpen(false))} className="grid h-10 w-10 place-items-center rounded border border-slate-200">
            <X size={20} />
          </button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <EmptyState title="Your cart is empty" action="Start shopping" onClick={() => dispatch(setCartOpen(false))} />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[72px_1fr] gap-3 rounded border border-slate-200 p-3">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded object-cover" />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-black leading-snug">{item.title}</h3>
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="text-slate-400 hover:text-coral">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="mt-1 font-bold text-brand-700">{money(item.price)}</p>
                    <div className="mt-2 flex w-28 items-center justify-between rounded border border-slate-200">
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="grid h-8 w-8 place-items-center">
                        <Minus size={15} />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="grid h-8 w-8 place-items-center">
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="space-y-2 text-sm font-semibold text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : money(shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-ink">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            onClick={() => dispatch(setCartOpen(false))}
            className="mt-4 grid h-12 place-items-center rounded bg-ink font-black text-white hover:bg-brand-700"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  )
}

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.items)
  const user = useSelector((state) => state.auth.user)
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    dispatch(setCartOpen(false))
  }, [dispatch])
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    payment: yup.string().required('Select a payment method'),
  })
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '', payment: 'cod' },
  })

  const onSubmit = () => {
    dispatch(setCartOpen(false))
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="rounded border border-slate-200 bg-white p-8 shadow-soft">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint/10 text-mint">
            <CheckCircle2 size={30} />
          </span>
          <h1 className="mt-5 text-3xl font-black">Order placed successfully</h1>
          <p className="mx-auto mt-3 max-w-md font-semibold leading-7 text-slate-600">
            Thank you for shopping with NexaCart. Your order confirmation and delivery updates are ready in this frontend flow.
          </p>
          <button onClick={() => navigate('/')} className="mt-6 h-12 rounded bg-ink px-6 font-black text-white hover:bg-brand-700">
            Continue Shopping
          </button>
        </div>
      </section>
    )
  }

  if (cart.length === 0) return <EmptyPage title="Your cart is empty" />

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black">Checkout</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded border border-slate-200 bg-white p-5">
          <div className="mb-6 grid grid-cols-3 gap-2">
            {['Customer', 'Delivery', 'Payment'].map((label, index) => (
              <button
                type="button"
                key={label}
                onClick={() => setStep(index + 1)}
                className={`h-11 rounded text-sm font-black ${step === index + 1 ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {label}
              </button>
            ))}
          </div>
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={formState.errors.name?.message} {...register('name')} />
              <Field label="Email" error={formState.errors.email?.message} {...register('email')} />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Address" error={formState.errors.address?.message} {...register('address')} />
              <Field label="City" error={formState.errors.city?.message} {...register('city')} />
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block text-sm font-black text-slate-700">Payment method</label>
              <select {...register('payment')} className="mt-2 h-12 w-full rounded border border-slate-200 px-3 font-semibold">
                <option value="cod">Cash on delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
              {formState.errors.payment && <p className="mt-1 text-sm font-semibold text-red-600">{formState.errors.payment.message}</p>}
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button type="button" onClick={() => setStep(Math.max(1, step - 1))} className="h-11 rounded border border-slate-300 px-5 font-black">
              Back
            </button>
            {step < 3 ? (
              <button type="button" onClick={() => setStep(Math.min(3, step + 1))} className="h-11 rounded bg-ink px-5 font-black text-white">
                Next
              </button>
            ) : (
              <button type="submit" className="h-11 rounded bg-mint px-5 font-black text-white">
                Place Order
              </button>
            )}
          </div>
        </form>
        <OrderSummary items={cart} />
      </div>
    </section>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input {...props} className="mt-2 h-12 w-full rounded border border-slate-200 px-3 font-semibold outline-none ring-brand-500 focus:ring-2" />
      {error && <span className="mt-1 block text-sm font-semibold text-red-600">{error}</span>}
    </label>
  )
}

function OrderSummary({ items }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 2999 ? 0 : 149

  return (
    <aside className="h-fit rounded border border-slate-200 bg-white p-5">
      <h2 className="font-black">Order Summary</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 text-sm">
            <span className="font-semibold text-slate-600">
              {item.title} x {item.quantity}
            </span>
            <span className="font-black">{money(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-600">
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : money(shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-black text-ink">
          <span>Total</span>
          <span>{money(subtotal + shipping)}</span>
        </div>
      </div>
    </aside>
  )
}

function AuthPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const schema = yup.object({
    name: yup.string(),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Use at least 6 characters').required('Password is required'),
  })
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema), defaultValues: { name: 'Shreya Kumari' } })

  const onSubmit = (values) => {
    dispatch(login(values))
    navigate('/')
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black">Login / Register</h1>
        <p className="mt-2 text-slate-600">Use demo authentication to keep wishlist, cart, and checkout details ready.</p>
        {user && <p className="mt-4 rounded bg-mint/10 p-3 font-semibold text-mint">Signed in as {user.email}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <Field label="Name" error={formState.errors.name?.message} {...register('name')} />
          <Field label="Email" error={formState.errors.email?.message} {...register('email')} />
          <Field label="Password" type="password" error={formState.errors.password?.message} {...register('password')} />
          <button className="h-12 rounded bg-ink font-black text-white hover:bg-brand-700">Continue</button>
        </form>
      </div>
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
        alt="Secure shopping dashboard"
        className="h-full min-h-80 rounded object-cover shadow-soft"
      />
    </section>
  )
}

function EmptyState({ title, action, onClick, to }) {
  const content = (
    <button onClick={onClick} className="mt-4 h-11 rounded bg-ink px-5 font-black text-white hover:bg-brand-700">
      {action}
    </button>
  )

  return (
    <div className="rounded border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-black">{title}</p>
      {to ? <Link to={to}>{content}</Link> : content}
    </div>
  )
}

function EmptyPage({ title }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <EmptyState title={title} action="Go to shop" to="/" />
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded bg-brand-700 font-black text-white">NC</span>
            <p className="text-lg font-black text-ink">NexaCart</p>
          </div>
          <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-slate-500">
            A responsive production-style ecommerce frontend for fast product discovery, saved carts, wishlist, and checkout.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-slate-600">
            <span className="rounded bg-slate-100 px-3 py-2">React</span>
            <span className="rounded bg-slate-100 px-3 py-2">Redux Toolkit</span>
            <span className="rounded bg-slate-100 px-3 py-2">Tailwind CSS</span>
          </div>
        </div>
        <div>
          <p className="font-black text-ink">Shop</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-500">
            <Link to="/" className="hover:text-brand-700">Products</Link>
            <Link to="/wishlist" className="hover:text-brand-700">Wishlist</Link>
            <Link to="/checkout" className="hover:text-brand-700">Checkout</Link>
            <Link to="/auth" className="hover:text-brand-700">Account</Link>
          </div>
        </div>
        <div>
          <p className="font-black text-ink">Support</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-500">
            <span>Shipping and delivery</span>
            <span>Returns and refunds</span>
            <span>Secure payments</span>
            <span>Order tracking</span>
          </div>
        </div>
        <div>
          <p className="font-black text-ink">Store Promise</p>
          <div className="mt-3 grid gap-3 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-2"><Truck size={17} className="text-brand-700" /> Fast dispatch</span>
            <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-brand-700" /> Protected checkout</span>
            <span className="flex items-center gap-2"><PackageCheck size={17} className="text-brand-700" /> Easy returns</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs font-semibold text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© 2026 NexaCart. Built by Shreya Tiwari.</span>
          <span>Production-ready responsive frontend demo.</span>
        </div>
      </div>
    </footer>
  )
}

export default App
