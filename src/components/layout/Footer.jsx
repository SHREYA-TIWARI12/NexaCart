import { PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'

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
            Curated daily essentials, quick delivery, simple returns, and a smoother way to shop from home.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-slate-600">
            <span className="rounded bg-slate-100 px-3 py-2">Fast delivery</span>
            <span className="rounded bg-slate-100 px-3 py-2">Easy returns</span>
            <span className="rounded bg-slate-100 px-3 py-2">Secure checkout</span>
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
            <Link to="/support/shipping" className="hover:text-brand-700">Shipping and delivery</Link>
            <Link to="/support/returns" className="hover:text-brand-700">Returns and refunds</Link>
            <Link to="/support/payments" className="hover:text-brand-700">Secure payments</Link>
            <Link to="/support/tracking" className="hover:text-brand-700">Order tracking</Link>
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
          <span>© 2026 NexaCart. All rights reserved.</span>
          <span>Made for simple, reliable everyday shopping.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
