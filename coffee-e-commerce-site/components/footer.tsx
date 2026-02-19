import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                <span className="font-serif text-sm font-bold text-accent-foreground">E</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight">
                Ember & Brew
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              Exceptional single-origin coffees, expertly roasted and delivered fresh to your door.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">Shop</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link href="/shop?category=single-origin" className="text-sm opacity-70 transition hover:opacity-100">Single Origin</Link></li>
              <li><Link href="/shop?category=blend" className="text-sm opacity-70 transition hover:opacity-100">Blends</Link></li>
              <li><Link href="/shop?category=espresso" className="text-sm opacity-70 transition hover:opacity-100">Espresso</Link></li>
              <li><Link href="/shop?category=decaf" className="text-sm opacity-70 transition hover:opacity-100">Decaf</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">Company</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link href="/about" className="text-sm opacity-70 transition hover:opacity-100">Our Story</Link></li>
              <li><Link href="/about" className="text-sm opacity-70 transition hover:opacity-100">Sourcing</Link></li>
              <li><Link href="/about" className="text-sm opacity-70 transition hover:opacity-100">Sustainability</Link></li>
              <li><Link href="/about" className="text-sm opacity-70 transition hover:opacity-100">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">Support</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link href="/shop" className="text-sm opacity-70 transition hover:opacity-100">Shipping & Returns</Link></li>
              <li><Link href="/shop" className="text-sm opacity-70 transition hover:opacity-100">Brew Guides</Link></li>
              <li><Link href="/shop" className="text-sm opacity-70 transition hover:opacity-100">FAQ</Link></li>
              <li><Link href="/shop" className="text-sm opacity-70 transition hover:opacity-100">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-xs opacity-50">
            2026 Ember & Brew. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs opacity-50 cursor-pointer hover:opacity-100 transition">Instagram</span>
            <span className="text-xs opacity-50 cursor-pointer hover:opacity-100 transition">Twitter</span>
            <span className="text-xs opacity-50 cursor-pointer hover:opacity-100 transition">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
