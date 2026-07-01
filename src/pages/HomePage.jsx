import { useEffect, useState } from 'react'
import { ChevronRight, CreditCard, PackageCheck, ShieldCheck, SlidersHorizontal, Truck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../components/ui/EmptyState'
import FilterSidebar from '../components/products/FilterSidebar'
import ProductCard from '../components/products/ProductCard'
import ProductSkeleton from '../components/products/ProductSkeleton'
import PromoCard from '../components/home/PromoCard'
import SearchBox from '../components/products/SearchBox'
import TrustItem from '../components/home/TrustItem'
import { fetchProducts, resetFilters, setFilter } from '../store'

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

export default HomePage
