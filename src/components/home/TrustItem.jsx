function TrustItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded border border-slate-200 bg-white p-4">
      <span className="grid h-10 w-10 place-items-center rounded bg-brand-50 text-brand-700">{icon}</span>
      <div>
        <p className="font-black">{title}</p>
        <p className="text-sm font-semibold text-slate-500">{text}</p>
      </div>
    </div>
  )
}

export default TrustItem
