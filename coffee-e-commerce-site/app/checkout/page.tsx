import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Checkout | Ember & Brew',
  description: 'Complete your order.',
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  )
}
