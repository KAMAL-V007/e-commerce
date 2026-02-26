import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Star, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container-coffee py-20 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-accent hover:underline">← Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container-coffee py-8 md:py-16">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-square rounded-xl overflow-hidden bg-secondary"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full uppercase tracking-wide">
                {product.roast} Roast
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full uppercase tracking-wide">
                {product.weight}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="text-2xl font-bold text-foreground mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.longDescription}
            </p>

            <div className="mb-6">
              <span className="text-sm font-medium text-foreground mb-2 block">Origin</span>
              <span className="text-sm text-muted-foreground">{product.origin}</span>
            </div>

            <div className="mb-8">
              <span className="text-sm font-medium text-foreground mb-2 block">Tasting Notes</span>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-foreground hover:text-accent">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 text-foreground hover:text-accent">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-medium text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
