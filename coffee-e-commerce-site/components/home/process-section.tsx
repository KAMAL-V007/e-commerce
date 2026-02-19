import Image from 'next/image'
import { Leaf, Flame, Package, Coffee } from 'lucide-react'

const steps = [
  {
    icon: Leaf,
    title: 'Sourced',
    desc: 'Direct relationships with farmers across 12 countries, ensuring fair prices and exceptional quality.',
  },
  {
    icon: Flame,
    title: 'Roasted',
    desc: 'Small-batch roasting in our Brooklyn roastery, profiled to bring out each bean\'s unique character.',
  },
  {
    icon: Package,
    title: 'Packed',
    desc: 'Sealed within hours of roasting in compostable bags with a one-way degassing valve for freshness.',
  },
  {
    icon: Coffee,
    title: 'Delivered',
    desc: 'Shipped within 24 hours of roasting so you experience peak flavor in every cup.',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Our Process
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl text-balance">
              From Farm to Your Cup
            </h2>
            <p className="mt-4 max-w-md leading-relaxed opacity-70">
              Every step matters. We obsess over the details so you can enjoy the result.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step.title} className="flex flex-col gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed opacity-60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image
              src="/images/coffee-process.jpg"
              alt="Coffee roasting process"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
