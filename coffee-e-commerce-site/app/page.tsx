import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ProcessSection } from '@/components/home/process-section'
import { TestimonialSection } from '@/components/home/testimonial-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <ProcessSection />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
