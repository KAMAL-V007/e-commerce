export interface Product {
  id: string
  slug: string
  name: string
  origin: string
  price: number
  image: string
  description: string
  longDescription: string
  roastLevel: 'light' | 'medium' | 'medium-dark' | 'dark'
  flavorNotes: string[]
  weight: string
  category: 'single-origin' | 'blend' | 'espresso' | 'decaf'
  featured: boolean
  rating: number
  reviews: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Yirgacheffe, Ethiopia',
    price: 22.00,
    image: '/images/products/ethiopian-yirgacheffe.jpg',
    description: 'Bright and complex with floral aromatics and a wine-like finish.',
    longDescription: 'Sourced from the birthplace of coffee, this exceptional Yirgacheffe delivers an extraordinary cup experience. Grown at elevations above 1,800 meters, the beans develop slowly, concentrating their complex flavors. Each sip reveals layers of jasmine, bergamot, and ripe stone fruit, finishing with a clean, wine-like acidity that lingers beautifully.',
    roastLevel: 'light',
    flavorNotes: ['Jasmine', 'Bergamot', 'Stone Fruit'],
    weight: '340g',
    category: 'single-origin',
    featured: true,
    rating: 4.9,
    reviews: 127,
    inStock: true,
  },
  {
    id: '2',
    slug: 'colombian-supremo',
    name: 'Colombian Supremo',
    origin: 'Huila, Colombia',
    price: 19.50,
    image: '/images/products/colombian-supremo.jpg',
    description: 'Rich and balanced with caramel sweetness and nutty undertones.',
    longDescription: 'From the lush highlands of Huila, Colombia, this Supremo grade coffee represents the pinnacle of Colombian quality. Carefully hand-picked at peak ripeness and sun-dried on raised beds, these beans deliver a remarkably smooth cup with layers of caramel sweetness, toasted almond, and a hint of dark chocolate in the finish.',
    roastLevel: 'medium',
    flavorNotes: ['Caramel', 'Toasted Almond', 'Dark Chocolate'],
    weight: '340g',
    category: 'single-origin',
    featured: true,
    rating: 4.8,
    reviews: 203,
    inStock: true,
  },
  {
    id: '3',
    slug: 'guatemala-antigua',
    name: 'Guatemala Antigua',
    origin: 'Antigua, Guatemala',
    price: 21.00,
    image: '/images/products/guatemala-antigua.jpg',
    description: 'Full-bodied with smoky undertones and a spiced chocolate finish.',
    longDescription: 'Grown in the shadow of three volcanoes in the Antigua Valley, this coffee benefits from rich volcanic soil and ideal microclimates. The result is a full-bodied cup with remarkable depth, featuring smoky undertones reminiscent of the volcanic terroir, complemented by notes of spiced chocolate and a subtle sweetness.',
    roastLevel: 'medium-dark',
    flavorNotes: ['Smoky', 'Spiced Chocolate', 'Brown Sugar'],
    weight: '340g',
    category: 'single-origin',
    featured: true,
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: '4',
    slug: 'kenya-aa',
    name: 'Kenya AA',
    origin: 'Nyeri, Kenya',
    price: 24.00,
    image: '/images/products/kenya-aa.jpg',
    description: 'Vibrant acidity with blackcurrant and grapefruit notes.',
    longDescription: 'Kenya AA represents the largest and most premium grade of Kenyan coffee beans. Grown on the slopes of Mount Kenya in the Nyeri region, these beans undergo the traditional Kenyan double-wash process, producing an intensely clean cup with vibrant acidity. Expect bold flavors of blackcurrant, grapefruit, and a tomato-like savory quality.',
    roastLevel: 'light',
    flavorNotes: ['Blackcurrant', 'Grapefruit', 'Tomato'],
    weight: '340g',
    category: 'single-origin',
    featured: false,
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: '5',
    slug: 'brazil-santos',
    name: 'Brazil Santos',
    origin: 'Minas Gerais, Brazil',
    price: 17.50,
    image: '/images/products/brazil-santos.jpg',
    description: 'Smooth and nutty with low acidity and a creamy body.',
    longDescription: 'The classic Brazilian Santos is the foundation of many of the world\'s finest blends. Sourced from small family farms in the Minas Gerais region, this natural-process coffee delivers an incredibly smooth, low-acid cup with rich nutty flavors, creamy body, and sweet hints of milk chocolate.',
    roastLevel: 'medium',
    flavorNotes: ['Hazelnut', 'Milk Chocolate', 'Cream'],
    weight: '340g',
    category: 'single-origin',
    featured: false,
    rating: 4.6,
    reviews: 245,
    inStock: true,
  },
  {
    id: '6',
    slug: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    origin: 'North Sumatra, Indonesia',
    price: 20.00,
    image: '/images/products/sumatra-mandheling.jpg',
    description: 'Earthy and bold with herbal complexity and a syrupy body.',
    longDescription: 'From the mist-shrouded highlands of North Sumatra, Mandheling coffee is processed using the traditional wet-hull method unique to Indonesia. This creates its distinctive earthy character with notes of cedar, dark herbs, and a thick syrupy body. A coffee for those who appreciate bold, unconventional flavors.',
    roastLevel: 'dark',
    flavorNotes: ['Cedar', 'Dark Herbs', 'Tobacco'],
    weight: '340g',
    category: 'single-origin',
    featured: true,
    rating: 4.7,
    reviews: 112,
    inStock: true,
  },
  {
    id: '7',
    slug: 'morning-ritual-blend',
    name: 'Morning Ritual Blend',
    origin: 'Multi-Origin',
    price: 18.00,
    image: '/images/products/colombian-supremo.jpg',
    description: 'Our signature breakfast blend. Bright, sweet, and perfectly balanced.',
    longDescription: 'Crafted to be the perfect way to start your day, our Morning Ritual Blend combines bright Ethiopian naturals with smooth Brazilian beans and a touch of Colombian sweetness. The result is a beautifully balanced cup that is accessible yet complex enough to reward attention.',
    roastLevel: 'medium',
    flavorNotes: ['Honey', 'Citrus', 'Brown Sugar'],
    weight: '340g',
    category: 'blend',
    featured: false,
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: '8',
    slug: 'midnight-espresso',
    name: 'Midnight Espresso',
    origin: 'Multi-Origin',
    price: 20.50,
    image: '/images/products/guatemala-antigua.jpg',
    description: 'Bold and intense with a thick crema and bittersweet chocolate finish.',
    longDescription: 'Engineered for the perfect espresso shot, Midnight Espresso combines dark-roasted Brazilian and Guatemalan beans to produce an intensely rich, full-bodied shot with a thick golden crema. Notes of bittersweet chocolate and roasted nuts dominate, with a smoky finish that pairs beautifully with milk.',
    roastLevel: 'dark',
    flavorNotes: ['Dark Chocolate', 'Roasted Nuts', 'Smoke'],
    weight: '340g',
    category: 'espresso',
    featured: false,
    rating: 4.8,
    reviews: 189,
    inStock: true,
  },
  {
    id: '9',
    slug: 'swiss-water-decaf',
    name: 'Swiss Water Decaf',
    origin: 'Colombia',
    price: 21.00,
    image: '/images/products/brazil-santos.jpg',
    description: 'All the flavor, none of the caffeine. Chemical-free decaf process.',
    longDescription: 'Using the Swiss Water Process, this Colombian decaf retains all the beautiful flavors of its caffeinated counterpart without any chemical solvents. Expect a smooth, sweet cup with notes of caramel, vanilla, and a hint of citrus. Perfect for evening enjoyment.',
    roastLevel: 'medium',
    flavorNotes: ['Caramel', 'Vanilla', 'Citrus'],
    weight: '340g',
    category: 'decaf',
    featured: false,
    rating: 4.5,
    reviews: 78,
    inStock: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  return products.filter(p => p.id !== currentId).slice(0, limit)
}
