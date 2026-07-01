import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import CheckoutStepper from '../components/checkout/CheckoutStepper'
import OrderSummary from '../components/checkout/OrderSummary'
import Field from '../components/forms/Field'
import EmptyPage from '../components/ui/EmptyPage'
import { clearCart, setCartOpen } from '../store'

const checkoutSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  payment: yup.string().required('Select a payment method'),
})

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.items)
  const user = useSelector((state) => state.auth.user)
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    dispatch(setCartOpen(false))
  }, [dispatch])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '', payment: 'cod' },
  })

  const onSubmit = () => {
    dispatch(setCartOpen(false))
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="rounded border border-slate-200 bg-white p-8 shadow-soft">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint/10 text-mint">
            <CheckCircle2 size={30} />
          </span>
          <h1 className="mt-5 text-3xl font-black">Order placed successfully</h1>
          <p className="mx-auto mt-3 max-w-md font-semibold leading-7 text-slate-600">
            Thank you for shopping with NexaCart. Your order confirmation and delivery updates are ready in this frontend flow.
          </p>
          <button onClick={() => navigate('/')} className="mt-6 h-12 rounded bg-ink px-6 font-black text-white hover:bg-brand-700">
            Continue Shopping
          </button>
        </div>
      </section>
    )
  }

  if (cart.length === 0) return <EmptyPage title="Your cart is empty" />

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black">Checkout</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded border border-slate-200 bg-white p-5">
          <CheckoutStepper step={step} onStepChange={setStep} />
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={formState.errors.name?.message} {...register('name')} />
              <Field label="Email" error={formState.errors.email?.message} {...register('email')} />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Address" error={formState.errors.address?.message} {...register('address')} />
              <Field label="City" error={formState.errors.city?.message} {...register('city')} />
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block text-sm font-black text-slate-700">Payment method</label>
              <select {...register('payment')} className="mt-2 h-12 w-full rounded border border-slate-200 px-3 font-semibold">
                <option value="cod">Cash on delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
              {formState.errors.payment && <p className="mt-1 text-sm font-semibold text-red-600">{formState.errors.payment.message}</p>}
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button type="button" onClick={() => setStep(Math.max(1, step - 1))} className="h-11 rounded border border-slate-300 px-5 font-black">
              Back
            </button>
            {step < 3 ? (
              <button type="button" onClick={() => setStep(Math.min(3, step + 1))} className="h-11 rounded bg-ink px-5 font-black text-white">
                Next
              </button>
            ) : (
              <button type="submit" className="h-11 rounded bg-mint px-5 font-black text-white">
                Place Order
              </button>
            )}
          </div>
        </form>
        <OrderSummary items={cart} />
      </div>
    </section>
  )
}

export default CheckoutPage
