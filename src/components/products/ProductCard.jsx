import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, toggleWishlist } from '../../store'
import { money } from '../../utils/format'

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

export default ProductCard
