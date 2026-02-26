import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout");
      return;
    }
    toast.success("Order placed successfully! ☕");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-coffee py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-6" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any coffee yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide hover:bg-primary/90"
          >
            Browse Coffee <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-coffee py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 md:gap-6 p-4 bg-card rounded-lg border border-border"
                >
                  <Link to={`/product/${item.product.id}`} className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="font-heading font-semibold text-foreground hover:text-accent transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.product.weight} · {item.product.roast} roast</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-foreground hover:text-accent">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-foreground hover:text-accent">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{totalPrice >= 35 ? "Free" : "$5.99"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-base">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice >= 35 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>
              {totalPrice < 35 && (
                <p className="text-xs text-accent mt-3">Add ${(35 - totalPrice).toFixed(2)} more for free shipping!</p>
              )}
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-lg font-medium text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
              >
                {isAuthenticated ? "Place Order" : "Sign In to Checkout"}
              </button>
              {!isAuthenticated && (
                <Link to="/auth" className="block text-center text-sm text-accent mt-3 hover:underline">
                  Create an account or sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
