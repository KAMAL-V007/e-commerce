import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe, Heart, Leaf } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About | Ember & Brew',
  description: 'Learn about our passion for exceptional coffee.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about-roastery.jpg"
              alt="Our roastery"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              Our Story
            </p>
            <h1 className="max-w-2xl font-serif text-4xl font-bold text-primary-foreground md:text-6xl text-balance leading-tight">
              Crafted With Passion, Roasted With Purpose
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-primary-foreground/70">
              Born from an obsession with the perfect cup, Ember & Brew sources the world&apos;s finest beans and roasts them to bring out their extraordinary potential.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Since 2018
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                A Journey That Started With a Single Bean
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  What began as a small home-roasting experiment in a Brooklyn apartment has grown into a beloved specialty coffee brand. Our founders, Maya and Diego, spent two years traveling through coffee-producing regions, building direct relationships with farmers who shared their commitment to quality and sustainability.
                </p>
                <p>
                  Today, we work with over 30 farming partners across 12 countries, ensuring fair prices that enable sustainable farming practices while delivering the most exceptional coffees to your cup.
                </p>
                <p>
                  Every bean we source tells a story of its terroir, its people, and the craft that went into growing and processing it. We honor that story through meticulous roasting that reveals each coffee&apos;s unique character.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/coffee-process.jpg"
                alt="Coffee beans being roasted"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Our Values
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl text-balance">
                What We Stand For
              </h2>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: 'Direct Trade',
                  desc: 'We bypass middlemen to pay farmers 40-80% above fair trade minimums, fostering long-term relationships and ensuring the highest quality beans.',
                },
                {
                  icon: Leaf,
                  title: 'Sustainability',
                  desc: 'From compostable packaging to carbon-offset shipping, every decision we make considers its environmental impact. Our roastery runs on 100% renewable energy.',
                },
                {
                  icon: Heart,
                  title: 'Community',
                  desc: 'We invest 5% of our profits back into coffee-growing communities, funding education, healthcare, and infrastructure projects for farming families.',
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '12', label: 'Origin Countries' },
              { number: '30+', label: 'Farming Partners' },
              { number: '50k+', label: 'Bags Roasted Yearly' },
              { number: '4.8', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-8">
                <p className="font-serif text-4xl font-bold text-accent">{stat.number}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <h2 className="font-serif text-3xl font-bold text-secondary-foreground md:text-4xl text-balance">
              Ready to Taste the Difference?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore our collection of single-origin coffees and find your new favorite.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 px-8">
              <Link href="/shop">
                Shop Our Coffee
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
