function Badge({ children }) {
  return <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{children}</span>
}

export default Badge
