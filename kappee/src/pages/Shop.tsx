import { useState } from "react";
import { products, categories, roastLevels } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [roast, setRoast] = useState("all");
  const [sort, setSort] = useState("featured");

  let filtered = products.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (roast !== "all" && p.roast !== roast) return false;
    return true;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <Layout>
      <div className="container-coffee py-10 md:py-16">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-2">
          Shop Coffee
        </h1>
        <p className="text-muted-foreground mb-8">Find your perfect roast.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === c.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="w-px bg-border mx-2 hidden md:block" />
          <div className="flex flex-wrap gap-2">
            {roastLevels.map((r) => (
              <button
                key={r.value}
                onClick={() => setRoast(r.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  roast === r.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-auto px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm border border-border"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
