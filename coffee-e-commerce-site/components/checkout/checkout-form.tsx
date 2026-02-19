"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, CreditCard, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = totalPrice >= 50 ? 0 : 5.99
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some coffee before checking out.</p>
        <Button asChild className="mt-6 bg-primary text-primary-foreground" size="lg">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mb-6 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <Check className="h-10 w-10 text-accent" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Thank you for your order. We&apos;ll start roasting your beans right away. You&apos;ll receive a confirmation email with tracking details shortly.
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">Order #EB-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
        <Button asChild className="mt-8 bg-primary text-primary-foreground" size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setStep('success')
    setIsProcessing(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl">Checkout</h1>

      {/* Steps indicator */}
      <div className="mb-12 flex items-center gap-4">
        {['Information', 'Payment'].map((label, i) => {
          const isActive = (i === 0 && step === 'info') || (i === 1 && step === 'payment')
          const isDone = (i === 0 && step === 'payment')
          return (
            <div key={label} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                isDone ? 'bg-accent text-accent-foreground' : isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${isActive || isDone ? 'text-foreground' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {i < 1 && <div className="mx-2 h-px w-12 bg-border" />}
            </div>
          )
        })}
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'info' && (
            <div className="flex flex-col gap-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">Contact Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 000-0000" className="mt-1.5" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-foreground">Address</Label>
                    <Input id="address" placeholder="123 Coffee Lane" className="mt-1.5" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="city" className="text-foreground">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-foreground">State</Label>
                      <Input id="state" placeholder="NY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-foreground">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setStep('payment')}>
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 'payment' && (
            <div className="flex flex-col gap-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">Payment Details</h2>
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="cardName" className="text-foreground">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" className="mt-1.5" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="expiry" className="text-foreground">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="lg" onClick={() => setStep('info')}>
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="mt-6 flex flex-col gap-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.grind}`} className="flex gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
