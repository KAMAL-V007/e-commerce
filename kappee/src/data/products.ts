import product1 from "@/assets/coffee-product-1.jpg";
import product2 from "@/assets/coffee-product-2.jpg";
import product3 from "@/assets/coffee-product-3.jpg";
import product4 from "@/assets/coffee-product-4.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  category: "single-origin" | "blend" | "cold-brew" | "equipment";
  roast: "light" | "medium" | "dark";
  weight: string;
  origin: string;
  notes: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe",
    price: 18.99,
    description: "Bright, fruity single origin with blueberry and citrus notes.",
    longDescription: "Sourced from the birthplace of coffee, our Ethiopian Yirgacheffe is a washed-process gem from the Gedeo zone. Grown at 1,800–2,200 meters, these beans develop an extraordinary complexity. Expect a bright acidity with juicy blueberry, citrus zest, and a delicate jasmine finish that lingers beautifully.",
    image: product1,
    category: "single-origin",
    roast: "light",
    weight: "340g",
    origin: "Yirgacheffe, Ethiopia",
    notes: ["Blueberry", "Citrus", "Jasmine"],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "midnight-reserve",
    name: "Midnight Reserve",
    price: 16.99,
    description: "Bold, smoky dark roast with chocolate and walnut undertones.",
    longDescription: "Our signature dark roast is a carefully crafted blend of Brazilian and Sumatran beans. Roasted low and slow to bring out deep, smoky flavors balanced by rich dark chocolate and a subtle walnut sweetness. Perfect for espresso or a powerful French press brew.",
    image: product2,
    category: "blend",
    roast: "dark",
    weight: "340g",
    origin: "Brazil & Sumatra",
    notes: ["Dark Chocolate", "Walnut", "Smoky"],
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "sunrise-espresso",
    name: "Sunrise Espresso",
    price: 17.49,
    description: "Balanced espresso blend with caramel sweetness and nutty body.",
    longDescription: "Designed for the perfect espresso shot, Sunrise Espresso is a medium roast blend of Colombian and Guatemalan beans. It pulls with a gorgeous crema, delivering sweet caramel notes, a round nutty body, and a clean finish. Also makes an exceptional milk-based drink.",
    image: product3,
    category: "blend",
    roast: "medium",
    weight: "340g",
    origin: "Colombia & Guatemala",
    notes: ["Caramel", "Hazelnut", "Cocoa"],
    inStock: true,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "classic-cold-brew",
    name: "Classic Cold Brew",
    price: 5.99,
    description: "Smooth, ready-to-drink cold brew with low acidity.",
    longDescription: "Brewed for 18 hours with our custom cold brew blend, this ready-to-drink bottle delivers an impossibly smooth coffee experience. Low acidity and naturally sweet, with tasting notes of milk chocolate, vanilla, and stone fruit. Enjoy it straight or over ice.",
    image: product4,
    category: "cold-brew",
    roast: "medium",
    weight: "355ml",
    origin: "Colombia",
    notes: ["Milk Chocolate", "Vanilla", "Stone Fruit"],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "costa-rica-tarrazu",
    name: "Costa Rica Tarrazú",
    price: 21.99,
    description: "Honey-processed with bright acidity and tropical sweetness.",
    longDescription: "From the renowned Tarrazú region of Costa Rica, this honey-processed coffee is a standout. Grown at high altitude, it offers a vibrant cup with tropical fruit sweetness, honey-like body, and a crisp citric acidity. A truly special coffee for the discerning palate.",
    image: product1,
    category: "single-origin",
    roast: "light",
    weight: "340g",
    origin: "Tarrazú, Costa Rica",
    notes: ["Tropical Fruit", "Honey", "Citrus"],
    inStock: true,
    rating: 4.9,
    reviews: 67,
  },
  {
    id: "house-blend",
    name: "The House Blend",
    price: 14.99,
    description: "Our everyday medium roast — approachable, balanced, delicious.",
    longDescription: "The one that started it all. Our House Blend is a crowd-pleasing medium roast combining beans from three continents. Balanced sweetness, mild acidity, and a comforting body of brown sugar and toasted almond. Perfect for your daily ritual.",
    image: product3,
    category: "blend",
    roast: "medium",
    weight: "340g",
    origin: "Multi-Origin",
    notes: ["Brown Sugar", "Almond", "Balanced"],
    inStock: true,
    rating: 4.5,
    reviews: 312,
  },
];

export const categories = [
  { value: "all", label: "All Coffee" },
  { value: "single-origin", label: "Single Origin" },
  { value: "blend", label: "Blends" },
  { value: "cold-brew", label: "Cold Brew" },
];

export const roastLevels = [
  { value: "all", label: "All Roasts" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
];
