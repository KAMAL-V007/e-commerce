"use client"

import { getRelatedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function RelatedProducts({ currentId }: { currentId: string }) {
  const related = getRelatedProducts(currentId, 4)

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">You May Also Like</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
