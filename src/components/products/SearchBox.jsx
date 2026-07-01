import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../store'

function SearchBox({ compact = false }) {
  const dispatch = useDispatch()
  const search = useSelector((state) => state.products.filters.search)

  return (
    <label className="relative block w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
      <input
        value={search}
        onChange={(event) => dispatch(setFilter({ search: event.target.value }))}
        className={`${compact ? 'h-10' : 'h-12'} w-full rounded border border-slate-200 bg-slate-50 pl-10 pr-4 font-medium outline-none ring-brand-500 focus:bg-white focus:ring-2`}
        placeholder="Search products"
      />
    </label>
  )
}

export default SearchBox
