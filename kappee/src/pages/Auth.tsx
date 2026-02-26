import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Coffee } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (login(email, password)) {
        toast.success("Welcome back! ☕");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      if (!name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (register(name, email, password)) {
        toast.success("Account created! Welcome to Brew Haven ☕");
        navigate("/");
      } else {
        toast.error("An account with this email already exists");
      }
    }
  };

  return (
    <Layout>
      <div className="container-coffee py-16 md:py-24 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <Coffee className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              {isLogin ? "Welcome Back" : "Join Brew Haven"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {isLogin ? "Sign in to your account" : "Create your free account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-medium text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Auth;
