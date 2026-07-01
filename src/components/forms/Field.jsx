function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input {...props} className="mt-2 h-12 w-full rounded border border-slate-200 px-3 font-semibold outline-none ring-brand-500 focus:ring-2" />
      {error && <span className="mt-1 block text-sm font-semibold text-red-600">{error}</span>}
    </label>
  )
}

export default Field
