import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
      >
        <div className="aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <h3 className="font-heading font-semibold text-foreground text-lg leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAdd}
              className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
