"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart()
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="font-serif text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="font-serif text-xl font-semibold text-foreground tracking-tight">
            Ember & Brew
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href={user ? '/account' : '/login'}>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
              <span className="sr-only">{user ? 'Account' : 'Login'}</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
              Home
            </Link>
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
              Shop
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
              About
            </Link>
            <Link href={user ? '/account' : '/login'} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
              {user ? 'Account' : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
