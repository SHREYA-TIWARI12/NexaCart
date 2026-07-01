import { useSelector } from 'react-redux'
import EmptyState from '../components/ui/EmptyState'
import ProductCard from '../components/products/ProductCard'

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

export default WishlistPage
