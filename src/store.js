import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { categories, products as localProducts } from './data/products'

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const persist = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()
  localStorage.setItem('ecom_cart', JSON.stringify(state.cart.items))
  localStorage.setItem('ecom_wishlist', JSON.stringify(state.wishlist.items))
  localStorage.setItem('ecom_auth', JSON.stringify(state.auth.user))
  return result
}

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 3500,
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  const { filters } = getState().products
  let catalog = localProducts

  try {
    const { data } = await api.get('/products', { params: { limit: 12 } })
    catalog = data.products.map((item, index) => {
      const price = Math.round(799 + ((item.price * 83) % 8200))
      return {
        id: item.id,
        title: item.title,
        category: categories[index % categories.length],
        price,
        originalPrice: Math.round(price * 1.22),
        rating: item.rating,
        stock: item.stock,
        image: item.thumbnail,
        description: item.description,
      }
    })
  } catch {
    catalog = localProducts
  }

  const term = filters.search.trim().toLowerCase()
  let filtered = catalog.filter((product) => {
    const matchesSearch = !term || product.title.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    const matchesCategory = filters.category === 'All' || product.category.toLowerCase() === filters.category.toLowerCase()
    const matchesPrice = product.price <= filters.maxPrice
    const matchesRating = product.rating >= filters.rating
    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  if (filters.sort === 'price-low') filtered = filtered.sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-high') filtered = filtered.sort((a, b) => b.price - a.price)
  if (filters.sort === 'rating') filtered = filtered.sort((a, b) => b.rating - a.rating)

  return filtered
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: '',
    categories,
    filters: {
      search: '',
      category: 'All',
      maxPrice: 10000,
      rating: 0,
      sort: 'featured',
    },
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = { search: '', category: 'All', maxPrice: 10000, rating: 0, sort: 'featured' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Products could not be loaded.'
      })
  },
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: readJson('ecom_cart', []), isOpen: false },
  reducers: {
    addToCart(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload.id)
      if (item) item.quantity += 1
      else state.items.push({ ...action.payload, quantity: 1 })
      state.isOpen = true
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload.id)
      if (item) item.quantity = Math.max(1, action.payload.quantity)
    },
    setCartOpen(state, action) {
      state.isOpen = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: readJson('ecom_wishlist', []) },
  reducers: {
    toggleWishlist(state, action) {
      const exists = state.items.some((item) => item.id === action.payload.id)
      state.items = exists ? state.items.filter((item) => item.id !== action.payload.id) : [...state.items, action.payload]
    },
  },
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: readJson('ecom_auth', null) },
  reducers: {
    login(state, action) {
      state.user = { name: action.payload.name || 'Shreya Kumari', email: action.payload.email, token: `demo-${Date.now()}` }
    },
    logout(state) {
      state.user = null
    },
  },
})

export const { setFilter, resetFilters } = productsSlice.actions
export const { addToCart, removeFromCart, updateQuantity, setCartOpen, clearCart } = cartSlice.actions
export const { toggleWishlist } = wishlistSlice.actions
export const { login, logout } = authSlice.actions

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persist),
})
