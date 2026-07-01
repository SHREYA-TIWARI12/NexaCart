import { CheckCircle2, ShieldCheck, Star, Truck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import EmptyPage from '../components/ui/EmptyPage'
import { products as fallbackProducts } from '../data/products'
import { addToCart, toggleWishlist } from '../store'
import { money } from '../utils/format'

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

export default ProductDetailPage
