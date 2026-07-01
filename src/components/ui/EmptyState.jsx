import { Link } from 'react-router-dom'

function EmptyState({ title, action, onClick, to }) {
  const content = (
    <button onClick={onClick} className="mt-4 h-11 rounded bg-ink px-5 font-black text-white hover:bg-brand-700">
      {action}
    </button>
  )

  return (
    <div className="rounded border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-black">{title}</p>
      {to ? <Link to={to}>{content}</Link> : content}
    </div>
  )
}

export default EmptyState
