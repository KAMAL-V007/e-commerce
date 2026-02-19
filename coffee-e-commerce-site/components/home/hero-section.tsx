import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-coffee.jpg"
          alt="Premium specialty coffee setup"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
            Single Origin Specialty Coffee
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-primary-foreground md:text-7xl">
            From Seed <br />to Your <br />
            <span className="italic text-accent">Perfect Cup</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/70">
            Discover exceptional coffees from the world&apos;s finest growing regions, expertly roasted in small batches and delivered fresh to your door.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
