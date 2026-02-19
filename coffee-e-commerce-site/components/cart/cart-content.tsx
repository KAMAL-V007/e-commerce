"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Your Cart is Empty</h1>
          <p className="mt-2 text-muted-foreground">Looks like you haven&apos;t added any coffee yet.</p>
          <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            <Link href="/shop">
              Browse Coffee
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const shipping = totalPrice >= 50 ? 0 : 5.99
  const total = totalPrice + shipping

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Shopping Cart</h1>
        <Button variant="ghost" onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive">
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.grind}`}
                className="flex gap-6 rounded-xl border border-border bg-card p-4 md:p-6"
              >
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-serif text-lg font-semibold text-foreground transition-colors hover:text-accent">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.grind} / {item.product.weight}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground transition hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-accent">Add ${(50 - totalPrice).toFixed(2)} more for free shipping</p>
              )}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button asChild className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
