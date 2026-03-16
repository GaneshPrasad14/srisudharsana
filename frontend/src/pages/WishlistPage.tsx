import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const WishlistPage = () => {
  const { wishlist } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Wishlist</h1>
          <p className="font-body text-primary-foreground/70">{wishlistProducts.length} saved items</p>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {wishlistProducts.length === 0 ? (
          <p className="text-center font-body text-muted-foreground py-20">Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
