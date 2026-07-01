import { Heart, Menu, ShoppingBag, User, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { logout, setCartOpen, setFilter } from '../../store'
import { navItems, shopCategories } from '../../constants/navigation'
import Badge from '../ui/Badge'
import IconLink from '../ui/IconLink'
import SearchBox from '../products/SearchBox'

function CategoryButtons({ onSelect, className = '' }) {
  return (
    <div className={className}>
      {shopCategories.map((category) => (
        <button key={category} onClick={() => onSelect(category)} className="hover:text-brand-700">
          {category}
        </button>
      ))}
    </div>
  )
}

function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0))
  const wishlistCount = useSelector((state) => state.wishlist.items.length)
  const user = useSelector((state) => state.auth.user)
  const isShopPage = location.pathname === '/'

  const selectCategory = (category) => {
    dispatch(setFilter({ category }))
    setMenuOpen(false)
  }

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
        {isShopPage && (
          <div className="mx-4 hidden max-w-xl flex-1 lg:block">
            <SearchBox compact />
          </div>
        )}
        {!isShopPage && <div className="hidden flex-1 lg:block" />}
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
            {isShopPage && (
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                {shopCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => selectCategory(category)}
                    className="rounded border border-slate-200 px-3 py-2 text-left text-sm font-bold text-slate-600"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {isShopPage && (
        <div className="hidden border-t border-slate-100 bg-white md:block">
          <CategoryButtons onSelect={selectCategory} className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-sm font-bold text-slate-600 sm:px-6 lg:px-8" />
        </div>
      )}
    </header>
  )
}

export default Navbar
