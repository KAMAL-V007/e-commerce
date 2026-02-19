"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
            Join the Ember & Brew Community
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Get early access to new roasts, brewing tips, and exclusive offers delivered to your inbox.
          </p>
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-medium">Welcome to the community!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 max-w-sm bg-background border-border text-foreground"
              />
              <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
