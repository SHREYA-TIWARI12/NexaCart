import { Link } from 'react-router-dom'
import Badge from './Badge'

function IconLink({ to, label, count, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded border border-slate-200 bg-white hover:border-brand-500"
    >
      {children}
      {count > 0 && <Badge>{count}</Badge>}
    </Link>
  )
}

export default IconLink
