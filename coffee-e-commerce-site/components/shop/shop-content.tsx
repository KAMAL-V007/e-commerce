"use client"

import { useState, useMemo } from 'react'
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  { value: 'all', label: 'All Coffee' },
  { value: 'single-origin', label: 'Single Origin' },
  { value: 'blend', label: 'Blends' },
  { value: 'espresso', label: 'Espresso' },
  { value: 'decaf', label: 'Decaf' },
]

const roastLevels = [
  { value: 'all', label: 'All Roasts' },
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-dark', label: 'Medium-Dark' },
  { value: 'dark', label: 'Dark' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' },
]

export function ShopContent() {
  const [category, setCategory] = useState('all')
  const [roast, setRoast] = useState('all')
  const [sort, setSort] = useState('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let result = [...products]

    if (category !== 'all') result = result.filter(p => p.category === category)
    if (roast !== 'all') result = result.filter(p => p.roastLevel === roast)

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [category, roast, sort])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Our Coffee</h1>
        <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
          Every bean tells a story. Explore our carefully curated collection of coffees from the world&apos;s finest growing regions.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={roast} onValueChange={setRoast}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roastLevels.map(r => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="hidden items-center gap-1 md:flex">
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setView('grid')}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setView('list')}
              aria-label="List view"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">{filtered.length} products</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-medium text-foreground">No coffees found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          <Button variant="outline" className="mt-4" onClick={() => { setCategory('all'); setRoast('all') }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={
          view === 'grid'
            ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-6'
        }>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
