import { CreditCard, PackageCheck, RotateCcw, SearchCheck, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const supportContent = {
  shipping: {
    icon: Truck,
    title: 'Shipping and Delivery',
    summary: 'Orders are packed quickly and dispatched through trusted delivery partners.',
    details: [
      'Standard delivery usually takes 2-4 business days after dispatch.',
      'Free delivery is available on orders above Rs. 2,999.',
      'Delivery timelines may vary slightly for remote locations or high-demand sale days.',
    ],
  },
  returns: {
    icon: RotateCcw,
    title: 'Returns and Refunds',
    summary: 'Shop with confidence using a simple 7-day return window on eligible products.',
    details: [
      'Return requests can be raised within 7 days of delivery.',
      'Products should be unused, undamaged, and returned with original packaging.',
      'Refunds are processed after the returned item passes a quality check.',
    ],
  },
  payments: {
    icon: CreditCard,
    title: 'Secure Payments',
    summary: 'Choose from common payment options with a checkout experience designed for safety.',
    details: [
      'Supported payment modes include UPI, cards, and cash on delivery.',
      'Payment details are handled through secure checkout flows.',
      'For failed transactions, the amount is usually reversed by the bank or payment provider.',
    ],
  },
  tracking: {
    icon: SearchCheck,
    title: 'Order Tracking',
    summary: 'Follow your order from confirmation to delivery with clear status updates.',
    details: [
      'Order status updates appear after your checkout is confirmed.',
      'Tracking information is shared once the package is dispatched.',
      'If a delivery is delayed, check the latest available status before raising a request.',
    ],
  },
}

function SupportPage() {
  const { topic } = useParams()
  const activeTopic = supportContent[topic] ? topic : 'shipping'
  const content = supportContent[activeTopic]
  const Icon = content.icon

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="grid h-14 w-14 place-items-center rounded bg-brand-50 text-brand-700">
            <Icon size={28} />
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.15em] text-brand-700">Help Center</p>
            <h1 className="mt-1 text-3xl font-black">{content.title}</h1>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">{content.summary}</p>
        <div className="mt-6 grid gap-3">
          {content.details.map((detail) => (
            <div key={detail} className="flex gap-3 rounded border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
              <PackageCheck size={19} className="mt-0.5 shrink-0 text-mint" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-5">
          {Object.entries(supportContent).map(([key, item]) => (
            <Link
              key={key}
              to={`/support/${key}`}
              className={`rounded border px-4 py-2 text-sm font-black ${
                key === activeTopic ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:border-brand-500'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SupportPage
