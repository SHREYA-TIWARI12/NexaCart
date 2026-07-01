function CheckoutStepper({ step, onStepChange }) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-2">
      {['Customer', 'Delivery', 'Payment'].map((label, index) => (
        <button
          type="button"
          key={label}
          onClick={() => onStepChange(index + 1)}
          className={`h-11 rounded text-sm font-black ${step === index + 1 ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CheckoutStepper
