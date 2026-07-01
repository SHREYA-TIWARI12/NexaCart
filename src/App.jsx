import { Route, Routes } from 'react-router-dom'
import CartDrawer from './components/layout/CartDrawer'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import AuthPage from './pages/AuthPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import SupportPage from './pages/SupportPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-ink">
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/support/:topic" element={<SupportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
