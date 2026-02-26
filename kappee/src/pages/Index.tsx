import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, Award } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-coffee.jpg";
import { motion } from "framer-motion";

const features = [
  { icon: Leaf, title: "Ethically Sourced", desc: "Direct trade from family farms across the globe." },
  { icon: Award, title: "Small Batch Roasted", desc: "Freshly roasted every week for peak flavor." },
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $35, delivered to your door." },
];

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium coffee" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container-coffee relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-4">
              Coffee Worth
              <br />
              <span className="text-accent">Savoring</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed max-w-md">
              From seed to cup, we craft exceptional coffee experiences that awaken your senses.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition-all"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container-coffee py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-coffee pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Our Favorites
            </h2>
            <p className="text-muted-foreground mt-2">Hand-picked for the discerning palate.</p>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="md:hidden mt-8 text-center">
          <Link to="/shop" className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-coffee py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Subscribe & Save 15%
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Get your favorite coffee delivered on your schedule. Cancel anytime.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition-all"
          >
            Start Your Subscription
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
