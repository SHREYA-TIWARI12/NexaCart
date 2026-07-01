import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Field from '../components/forms/Field'
import { login } from '../store'

const authSchema = yup.object({
  name: yup.string(),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Use at least 6 characters').required('Password is required'),
})

function AuthPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(authSchema), defaultValues: { name: 'Shreya Kumari' } })

  const onSubmit = (values) => {
    dispatch(login(values))
    navigate('/')
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black">Login / Register</h1>
        <p className="mt-2 text-slate-600">Use demo authentication to keep wishlist, cart, and checkout details ready.</p>
        {user && <p className="mt-4 rounded bg-mint/10 p-3 font-semibold text-mint">Signed in as {user.email}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <Field label="Name" error={formState.errors.name?.message} {...register('name')} />
          <Field label="Email" error={formState.errors.email?.message} {...register('email')} />
          <Field label="Password" type="password" error={formState.errors.password?.message} {...register('password')} />
          <button className="h-12 rounded bg-ink font-black text-white hover:bg-brand-700">Continue</button>
        </form>
      </div>
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
        alt="Secure shopping dashboard"
        className="h-full min-h-80 rounded object-cover shadow-soft"
      />
    </section>
  )
}

export default AuthPage
