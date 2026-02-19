import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    title: 'Coffee Enthusiast',
    text: 'The Ethiopian Yirgacheffe completely changed my morning routine. The floral notes are incredible. I have never tasted anything like it from an online roaster.',
    rating: 5,
  },
  {
    name: 'James L.',
    title: 'Home Barista',
    text: 'Finally, a roaster that delivers on freshness. My espresso shots have never been better. The Midnight Espresso produces the most beautiful crema.',
    rating: 5,
  },
  {
    name: 'Elena K.',
    title: 'Subscription Member',
    text: 'I have been a subscriber for 8 months and every bag has been exceptional. The variety and quality are unmatched. Cannot recommend enough.',
    rating: 5,
  },
]

export function TestimonialSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Testimonials
        </p>
        <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
          What Our Customers Say
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-8"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.text}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
