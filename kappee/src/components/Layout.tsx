import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Coffee } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container-coffee flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl md:text-2xl font-bold text-foreground tracking-tight">
          <Coffee className="w-6 h-6 text-accent" />
          Brew Haven
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                location.pathname === link.to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Hi, {user?.name?.split(" ")[0]}</span>
              <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <Link to="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <div className="container-coffee py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium uppercase tracking-wide text-foreground hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-left text-muted-foreground">
                  Logout
                </button>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50 mt-20">
    <div className="container-coffee py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-3">
            <Coffee className="w-5 h-5 text-accent" />
            Brew Haven
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Ethically sourced, expertly roasted. We bring the world's finest coffee beans
            directly to your cup, one batch at a time.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Our Story</Link>
            <Link to="/cart" className="hover:text-accent transition-colors">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>hello@brewhaven.co</span>
            <span>+1 (555) 234-5678</span>
            <span>Portland, OR</span>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 Brew Haven. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
