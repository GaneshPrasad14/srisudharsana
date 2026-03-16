import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Quote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, mapApiProduct, Product, API_URL } from "@/data/products";
import { useState, useEffect } from "react";

import heroBanner from "@/assets/hero-banner.jpg";
import categorySaree from "@/assets/category-saree.jpg";
import categoryVeshti from "@/assets/category-veshti.jpg";
import categoryThundu from "@/assets/category-thundu.jpg";
import handwovenStory from "@/assets/handwoven-story.jpg";

const categories = [
  { name: "Sarees", slug: "sarees", image: categorySaree, desc: "Timeless silk elegance" },
  { name: "Veshti", slug: "veshti", image: categoryVeshti, desc: "Traditional men's drape" },
  { name: "Thundu", slug: "thundu", image: categoryThundu, desc: "Sacred angavastram" },
];

const testimonials = [
  { name: "Priya Sundaram", text: "The Kanchipuram silk saree I bought was absolutely breathtaking. The gold zari work is exquisite and the quality is unmatched.", rating: 5 },
  { name: "Ravi Kumar", text: "Best quality veshti I've ever owned. The cotton is soft yet durable, and the gold border adds such an elegant touch.", rating: 5 },
  { name: "Meenakshi Devi", text: "Sri Sudharsana Tex truly understands traditional craftsmanship. Every piece tells a story of our rich Tamil heritage.", rating: 5 },
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4).map(mapApiProduct));
      } catch (error) {
        console.error('Featured products load error:', error);
      } finally {
        setIsProductsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const featured = featuredProducts;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden">
        <img src={heroBanner} alt="Traditional silk saree in temple" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="font-body text-gold-light text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">Handwoven Heritage</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-cream leading-tight mb-6">
              Draped in <br />
              <span className="text-gold-gradient">Tradition</span>
            </h1>
            <p className="font-body text-cream/80 text-base sm:text-lg mb-8 leading-relaxed">
              Discover exquisite Kanchipuram silk sarees, traditional veshtis, and angavastrams — each thread woven with centuries of Tamil heritage.
            </p>
            <div className="flex gap-4">
              <Link to="/category/sarees" className="w-full sm:w-auto">
                <Button className="w-full bg-accent text-accent-foreground font-body tracking-wider px-8 py-6 text-sm hover:bg-gold-light transition-colors">
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-20 container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-14">
          <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-2">Collections</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold font-bold">Shop by Category</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Link to={`/category/${cat.slug}`} className="group block relative overflow-hidden rounded-lg aspect-[3/4]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-1">{cat.name}</h3>
                  <p className="font-body text-cream/70 text-xs sm:text-sm">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <div>
              <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-2">Curated</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">Featured Products</h2>
            </div>
            <Link to="/category/sarees" className="hidden md:flex items-center gap-2 font-body text-sm text-accent hover:text-maroon-light transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Handwoven Tradition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={handwovenStory} alt="Handloom weaving" className="rounded-lg w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-2">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Handwoven<br />Tradition</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                For centuries, the master weavers of Kanchipuram have created some of the world's most exquisite silk textiles. Each saree takes 15 to 20 days to complete, with every motif carrying deep cultural symbolism — from temple gopurams to mango paisley.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Our veshtis are woven from the finest cotton and silk, following the same traditions that have clothed kings and commoners alike for millennia. The gold zari borders are not just decorative — they represent prosperity and divine grace.
              </p>
              <Link to="/culture">
                <Button variant="outline" className="font-body tracking-wider border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Discover Our Heritage <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-body text-gold-light text-sm tracking-[0.3em] uppercase mb-2">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">What Our Patrons Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-maroon-light/30 rounded-lg p-6 backdrop-blur-sm"
              >
                <Quote size={24} className="text-gold-light mb-4" />
                <p className="font-body text-sm leading-relaxed opacity-90 mb-4">{t.text}</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-display font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center mb-10">
          <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-2">@srisudharsanatex</p>
          <h2 className="font-display text-4xl font-bold">Follow Our Journey</h2>
        </div>
        <GallerySection />
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-2">Stay Connected</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Join Our Heritage Circle</h2>
          <p className="font-body text-muted-foreground text-sm sm:text-base mb-8">Get early access to new collections, exclusive offers, and stories from the loom.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-primary text-primary-foreground font-body tracking-wider px-6 py-3">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};


const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const selectedCategory = "sarees"; // Define selectedCategory to make the code syntactically correct
        const response = await fetch(`${API_URL}/api/products?category=${selectedCategory}`);
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Gallery load error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  // Fallback to products if gallery is empty
  const items = galleryItems.length > 0 ? galleryItems : products.slice(0, 6).map(p => ({ image: p.image, caption: p.name }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
      {items.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square overflow-hidden group cursor-pointer"
        >
          <img 
            src={item.image} 
            alt={item.caption} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Index;
