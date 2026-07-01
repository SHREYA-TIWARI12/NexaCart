function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded border border-slate-200 bg-white">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="h-5 w-4/5 rounded bg-slate-200" />
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="h-11 rounded bg-slate-200" />
      </div>
    </div>
  )
}

export default ProductSkeleton
