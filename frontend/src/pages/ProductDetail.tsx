import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapApiProduct, Product, API_URL } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const pRes = await fetch(`${API_URL}/api/products/${id}`);
        const pData = await pRes.json();
        const mappedProduct = mapApiProduct(pData);
        setProduct(mappedProduct);

        // Fetch related
        const rRes = await fetch(`${API_URL}/api/products?category=${mappedProduct.category}`);
        const rData = await rRes.json();
        setRelatedProducts(rData.filter((p: any) => p._id !== id).slice(0, 4).map(mapApiProduct));
      } catch (error) {
        console.error('Product detail load error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  const whatsappOrder = () => {
    const message = `Hi! I'm interested in: ${product.name} - ₹${product.price.toLocaleString()}`;
    window.open(`https://wa.me/917548800581?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="font-body text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link> /
          <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">{product.category}</Link> /
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-card group cursor-zoom-in">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-150 transition-transform duration-500 origin-center" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {product.badge && (
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-body tracking-wide mb-3">{product.badge}</span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="font-body text-muted-foreground text-sm mb-4">{product.fabric}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"} />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="font-body text-sm text-accent font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex flex-1 gap-3">
                <Button onClick={() => addToCart(product)} className="flex-1 bg-primary text-primary-foreground font-body tracking-wider py-6">
                  <ShoppingBag size={18} className="mr-2" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(product.id)}
                  className="py-6 px-4"
                >
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-primary text-primary" : ""} />
                </Button>
              </div>
              <Button onClick={whatsappOrder} className="w-full sm:flex-1 bg-accent text-accent-foreground font-body tracking-wider py-6">
                <MessageCircle size={18} className="mr-2" /> Buy via WhatsApp
              </Button>
            </div>

            {/* Delivery */}
            <div className="border border-border rounded-lg p-4 space-y-3 mb-8">
              <div className="flex items-center gap-3 font-body text-sm">
                <Truck size={18} className="text-accent" />
                <span>Free delivery on orders above ₹5,000</span>
              </div>
              <div className="flex items-center gap-3 font-body text-sm">
                <Shield size={18} className="text-accent" />
                <span>100% authentic handloom guarantee</span>
              </div>
              <div className="flex items-center gap-3 font-body text-sm">
                <RotateCcw size={18} className="text-accent" />
                <span>Easy 7-day returns & exchanges</span>
              </div>
            </div>

            {/* Fabric Details */}
            <div>
              <h3 className="font-display text-xl font-semibold mb-3">Fabric Details</h3>
              <ul className="space-y-2">
                {product.details.map((d, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
