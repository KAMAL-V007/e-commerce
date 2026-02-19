"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const roastLabel = {
    light: 'Light Roast',
    medium: 'Medium Roast',
    'medium-dark': 'Med-Dark Roast',
    dark: 'Dark Roast',
  }

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
            {roastLabel[product.roastLevel]}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mb-1 text-xs text-muted-foreground">{product.origin}</p>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => addItem(product, 1, 'Whole Bean')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingBag className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
