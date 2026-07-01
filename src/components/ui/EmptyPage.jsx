import EmptyState from './EmptyState'

function EmptyPage({ title }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <EmptyState title={title} action="Go to shop" to="/" />
    </section>
  )
}

export default EmptyPage
