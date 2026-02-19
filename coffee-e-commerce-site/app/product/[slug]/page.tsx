import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductDetail } from '@/components/product/product-detail'
import { RelatedProducts } from '@/components/product/related-products'
import { Footer } from '@/components/footer'
import { getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.name} | Ember & Brew`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <ProductDetail product={product} />
        <RelatedProducts currentId={product.id} />
      </main>
      <Footer />
    </>
  )
}
