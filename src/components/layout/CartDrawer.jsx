import { Minus, Plus, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, setCartOpen, updateQuantity } from '../../store'
import { money } from '../../utils/format'
import EmptyState from '../ui/EmptyState'

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

export default CartDrawer
