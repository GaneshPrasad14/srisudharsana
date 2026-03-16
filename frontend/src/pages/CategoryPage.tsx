import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { products, mapApiProduct, Product, API_URL } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

const categoryInfo: Record<string, { title: string; desc: string }> = {
  sarees: { title: "Silk Sarees", desc: "Discover our exquisite collection of handwoven Kanchipuram silk sarees" },
  veshti: { title: "Veshti Collection", desc: "Traditional cotton and silk veshtis for the modern gentleman" },
  thundu: { title: "Thundu / Angavastram", desc: "Sacred towels and shawls for every traditional occasion" },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const info = categoryInfo[slug || ""] || { title: "All Products", desc: "" };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const url = slug 
          ? `${API_URL}/api/products?category=${slug}`
          : `${API_URL}/api/products`;
        const response = await fetch(url);
        const data = await response.json();
        setCategoryProducts(data.map(mapApiProduct));
      } catch (error) {
        console.error('Category products load error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [slug]);

  const filtered = categoryProducts;

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{info.title}</h1>
          <p className="font-body text-primary-foreground/70">{info.desc}</p>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-muted-foreground mb-8">{filtered.length} products</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
