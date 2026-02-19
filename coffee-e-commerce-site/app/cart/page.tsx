import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { CartContent } from '@/components/cart/cart-content'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Cart | Ember & Brew',
  description: 'Review your shopping cart.',
}

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <CartContent />
      </main>
      <Footer />
    </>
  )
}
