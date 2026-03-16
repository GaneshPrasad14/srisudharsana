import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group hover-lift"
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border">
        <div className="relative overflow-hidden aspect-square">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-body tracking-wide">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-body font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <Heart size={16} className={isInWishlist(product.id) ? "fill-primary text-primary" : ""} />
            </button>
            <button
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-maroon-light transition-colors"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-body text-muted-foreground tracking-wider uppercase mb-1">{product.fabric}</p>
          <h3 className="font-display text-base sm:text-lg font-semibold leading-tight mb-2 line-clamp-2 sm:line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star size={10} className="fill-accent text-accent" />
            <span className="font-body text-[10px] sm:text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm sm:text-base font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="font-body text-[11px] sm:text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
