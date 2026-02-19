"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Product } from '@/lib/products'

const grindOptions = ['Whole Bean', 'Coarse', 'Medium', 'Fine', 'Espresso']

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [grind, setGrind] = useState('Whole Bean')

  const roastLabel = {
    light: 'Light Roast',
    medium: 'Medium Roast',
    'medium-dark': 'Medium-Dark Roast',
    dark: 'Dark Roast',
  }

  const roastPercent = {
    light: 25,
    medium: 50,
    'medium-dark': 75,
    dark: 100,
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="transition hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.origin}</p>
          <p className="mt-4 text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.longDescription}</p>

          {/* Roast Level Bar */}
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Roast Level</span>
              <span className="text-sm text-muted-foreground">{roastLabel[product.roastLevel]}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${roastPercent[product.roastLevel]}%` }}
              />
            </div>
          </div>

          {/* Flavor Notes */}
          <div className="mt-6">
            <span className="text-sm font-medium text-foreground">Flavor Notes</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.flavorNotes.map(note => (
                <span key={note} className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Grind Selection */}
          <div className="mt-6">
            <span className="text-sm font-medium text-foreground">Grind</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {grindOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setGrind(option)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    grind === option
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-foreground hover:border-accent/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-border px-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center font-semibold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => addItem(product, quantity, grind)}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Free shipping over $50</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">30-day guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="mt-16">
        <TabsList className="bg-secondary">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="brewing">Brewing Guide</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Coffee Details</h3>
              <dl className="flex flex-col gap-3">
                {[
                  ['Origin', product.origin],
                  ['Roast Level', roastLabel[product.roastLevel]],
                  ['Weight', product.weight],
                  ['Flavor Notes', product.flavorNotes.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Shipping</h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <li>Free standard shipping on orders over $50</li>
                <li>Express shipping available (2-3 business days)</li>
                <li>Roasted and shipped within 24 hours</li>
                <li>Delivered in compostable packaging</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="brewing" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Recommended Brewing</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { method: 'Pour Over', ratio: '1:16', temp: '200F', time: '3-4 min' },
                { method: 'French Press', ratio: '1:15', temp: '200F', time: '4 min' },
                { method: 'Espresso', ratio: '1:2', temp: '200F', time: '25-30 sec' },
              ].map(brew => (
                <div key={brew.method} className="rounded-lg bg-secondary p-4">
                  <h4 className="mb-3 font-semibold text-foreground">{brew.method}</h4>
                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Ratio</dt>
                      <dd className="font-medium text-foreground">{brew.ratio}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Temperature</dt>
                      <dd className="font-medium text-foreground">{brew.temp}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Brew Time</dt>
                      <dd className="font-medium text-foreground">{brew.time}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{product.rating}</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-accent text-accent' : 'text-border'}`} />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{product.reviews} reviews</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Reviews are collected from verified purchasers.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
