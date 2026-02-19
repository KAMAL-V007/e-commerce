import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { ShopContent } from '@/components/shop/shop-content'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Shop | Ember & Brew',
  description: 'Browse our full collection of single-origin coffees, blends, espresso, and decaf.',
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <ShopContent />
      </main>
      <Footer />
    </>
  )
}
