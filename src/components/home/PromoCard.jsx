import { ChevronRight } from 'lucide-react'

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

export default PromoCard
