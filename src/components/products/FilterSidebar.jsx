import { useDispatch, useSelector } from 'react-redux'
import { resetFilters, setFilter } from '../../store'
import { money } from '../../utils/format'

function FilterSidebar() {
  const dispatch = useDispatch()
  const { categories, filters } = useSelector((state) => state.products)
  const allCategories = ['All', ...categories]

  return (
    <div className="sticky top-36 rounded border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-black">Filters</h2>
        <button onClick={() => dispatch(resetFilters())} className="text-sm font-bold text-brand-700">
          Reset
        </button>
      </div>
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Category</p>
          <div className="grid gap-2">
            {allCategories.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="radio"
                  checked={filters.category === category}
                  onChange={() => dispatch(setFilter({ category }))}
                  className="accent-brand-600"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Price up to {money(filters.maxPrice)}</p>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={filters.maxPrice}
            onChange={(event) => dispatch(setFilter({ maxPrice: Number(event.target.value) }))}
            className="w-full accent-brand-600"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Minimum rating</p>
          <div className="grid grid-cols-2 gap-2">
            {[0, 4, 4.5, 4.7].map((rating) => (
              <button
                key={rating}
                onClick={() => dispatch(setFilter({ rating }))}
                className={`rounded border px-3 py-2 text-sm font-bold ${
                  filters.rating === rating ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {rating === 0 ? 'Any' : `${rating}+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
