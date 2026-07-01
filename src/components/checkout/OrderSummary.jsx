import { money } from '../../utils/format'

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

export default OrderSummary
