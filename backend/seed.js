const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ override: true });

const MONGO_URI = process.env.MONGO_URI;
const BACKEND_URL = 'http://localhost:7050';
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Models (duplicated for standalone script)
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});
const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // slug
  price: { type: Number, required: true },
  originalPrice: Number,
  image: { type: String, required: true },
  images: [String],
  fabric: String,
  description: String,
  details: [String],
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  badge: String,
});
const Product = mongoose.model('Product', productSchema);

const categories = [
  { name: 'Sarees', slug: 'sarees' },
  { name: 'Veshti', slug: 'veshti' },
  { name: 'Thundu', slug: 'thundu' },
];

const productsData = [
  {
    name: "Kanchipuram Maroon Silk Saree",
    category: "sarees",
    price: 12500,
    originalPrice: 15000,
    image: "product-saree-1.jpg",
    images: ["product-saree-1.jpg", "product-saree-1.jpg"],
    fabric: "Pure Mulberry Silk",
    description: "Exquisite Kanchipuram silk saree in deep maroon with rich gold zari border. Handwoven by master artisans using traditional techniques passed down through generations.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Pure gold zari", "Weight: 750 grams", "Wash: Dry clean only"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: "Bestseller",
    source: 'assets'
  },
  {
    name: "Royal Blue Kanchipuram Saree",
    category: "sarees",
    price: 14800,
    originalPrice: 18000,
    image: "product-saree-2.jpg",
    images: ["product-saree-2.jpg", "product-saree-2.jpg"],
    fabric: "Pure Silk with Silver Zari",
    description: "Stunning royal blue Kanchipuram silk saree with intricate silver zari motifs. A masterpiece of South Indian weaving tradition.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Pure silver zari", "Weight: 800 grams", "Wash: Dry clean only"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    badge: "New Arrival",
    source: 'assets'
  },
  {
    name: "Emerald Green Silk Saree",
    category: "sarees",
    price: 11200,
    image: "product-saree-3.jpg",
    images: ["product-saree-3.jpg", "product-saree-3.jpg"],
    fabric: "Pure Kanchipuram Silk",
    description: "Vibrant emerald green Kanchipuram silk saree with contrasting gold zari border. Perfect for festive occasions.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Gold plated zari", "Weight: 700 grams", "Wash: Dry clean only"],
    rating: 4.7,
    reviews: 56,
    inStock: true,
    source: 'assets'
  },
  {
    name: "Golden Yellow Festival Saree",
    category: "sarees",
    price: 13500,
    originalPrice: 16000,
    image: "product-saree-4.jpg",
    images: ["product-saree-4.jpg", "product-saree-4.jpg"],
    fabric: "Pure Silk with Zari Work",
    description: "Radiant golden yellow saree with maroon zari border and traditional temple motifs. Ideal for weddings and temple visits.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Pure gold zari", "Weight: 780 grams", "Wash: Dry clean only"],
    rating: 4.6,
    reviews: 73,
    inStock: true,
    badge: "Festival Special",
    source: 'assets'
  },
  {
    name: "Premium Cotton Veshti",
    category: "veshti",
    price: 2800,
    originalPrice: 3500,
    image: "product-veshti-1.jpg",
    images: ["product-veshti-1.jpg", "product-veshti-1.jpg"],
    fabric: "Premium Handloom Cotton",
    description: "Traditional white cotton veshti with elegant gold zari border. Handwoven on traditional looms for authentic texture and comfort.",
    details: ["Length: 4 meters", "Border: Gold zari", "Weight: 350 grams", "Wash: Hand wash recommended"],
    rating: 4.5,
    reviews: 210,
    inStock: true,
    badge: "Popular",
    source: 'assets'
  },
  {
    name: "Traditional Angavastram",
    category: "thundu",
    price: 1800,
    image: "product-thundu-1.jpg",
    images: ["product-thundu-1.jpg", "product-thundu-1.jpg"],
    fabric: "Cotton with Zari Border",
    description: "Classic cream angavastram with maroon and gold woven border. A must-have accessory for traditional occasions.",
    details: ["Length: 2.5 meters", "Border: Gold & maroon zari", "Weight: 200 grams", "Wash: Hand wash"],
    rating: 4.4,
    reviews: 98,
    inStock: true,
    source: 'assets'
  },
  {
    name: "Classic Crimson Silk Saree",
    category: "sarees",
    price: 9500,
    originalPrice: 11500,
    image: "saree_web_bg_1.png",
    images: ["saree_web_bg_1.png", "saree_web_bg_1.png"],
    fabric: "Premium Kanchipuram Silk",
    description: "A timeless classic crimson silk saree with elegant woven patterns, perfect for wedding ceremonies.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: High-quality gold zari", "Weight: 720 grams", "Wash: Dry clean only"],
    rating: 4.8,
    reviews: 42,
    inStock: true,
    badge: "Limited Edition",
    source: 'public'
  },
  {
    name: "Mystic Purple Silk Saree",
    category: "sarees",
    price: 10800,
    originalPrice: 13000,
    image: "saree_web_bg_2.png",
    images: ["saree_web_bg_2.png", "saree_web_bg_2.png"],
    fabric: "Soft Mulberry Silk",
    description: "Deep mystic purple saree with intricate peacock motifs and a broad traditional border.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Silver and gold mix zari", "Weight: 750 grams", "Wash: Dry clean only"],
    rating: 4.9,
    reviews: 35,
    inStock: true,
    source: 'public'
  },
  {
    name: "Golden Sunshine Silk Saree",
    category: "sarees",
    price: 12200,
    image: "saree_web_bg_3.png",
    images: ["saree_web_bg_3.png", "saree_web_bg_3.png"],
    fabric: "Pure Silk",
    description: "Radiant golden yellow saree that captures the essence of morning sunshine, ideal for festive celebrations.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Pure gold zari", "Weight: 700 grams", "Wash: Dry clean only"],
    rating: 4.7,
    reviews: 28,
    inStock: true,
    badge: "Festive Pick",
    source: 'public'
  },
  {
    name: "Ocean Teal Silk Saree",
    category: "sarees",
    price: 11500,
    originalPrice: 14000,
    image: "saree_web_bg_4.png",
    images: ["saree_web_bg_4.png", "saree_web_bg_4.png"],
    fabric: "Handloom Silk",
    description: "A refreshing ocean teal shade with contemporary design elements blended with traditional weaving.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Copper zari work", "Weight: 740 grams", "Wash: Dry clean only"],
    rating: 4.6,
    reviews: 19,
    inStock: true,
    source: 'public'
  },
  {
    name: "Peacock Blue Grandeur Saree",
    category: "sarees",
    price: 15500,
    image: "saree_web_bg_5.png",
    images: ["saree_web_bg_5.png", "saree_web_bg_5.png"],
    fabric: "Grand Kanchipuram Silk",
    description: "Luxurious peacock blue silk saree featuring a grand pallu and exquisite detail work throughout.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: 2-gram gold pure zari", "Weight: 820 grams", "Wash: Dry clean only"],
    rating: 5.0,
    reviews: 12,
    inStock: true,
    badge: "Premium",
    source: 'public'
  },
  {
    name: "Ruby Rose Wedding Saree",
    category: "sarees",
    price: 13500,
    originalPrice: 16000,
    image: "saree_web_bg_new_1.png",
    images: ["saree_web_bg_new_1.png", "saree_web_bg_new_1.png"],
    fabric: "Heavy Silk",
    description: "Stunning ruby rose red saree with dense zari work, designed specifically for the modern bride.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Rich gold zari", "Weight: 850 grams", "Wash: Dry clean only"],
    rating: 4.8,
    reviews: 54,
    inStock: true,
    badge: "Bridal Collection",
    source: 'public'
  },
  {
    name: "Midnight Elegance Silk Saree",
    category: "sarees",
    price: 9900,
    image: "saree_web_bg_new_2.png",
    images: ["saree_web_bg_new_2.png", "saree_web_bg_new_2.png"],
    fabric: "Soft Silk",
    description: "Sophisticated navy blue saree with subtle floral patterns, perfect for evening gatherings.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Silver zari", "Weight: 680 grams", "Wash: Dry clean only"],
    rating: 4.7,
    reviews: 21,
    inStock: true,
    source: 'public'
  },
  {
    name: "Forest Fern Silk Saree",
    category: "sarees",
    price: 11200,
    image: "saree_web_bg_new_3.png",
    images: ["saree_web_bg_new_3.png", "saree_web_bg_new_3.png"],
    fabric: "Pure Handloom Silk",
    description: "Deep forest green saree with traditional motifs inspired by nature.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Antique gold zari", "Weight: 730 grams", "Wash: Dry clean only"],
    rating: 4.5,
    reviews: 15,
    inStock: true,
    source: 'public'
  },
  {
    name: "Copper Glow Silk Saree",
    category: "sarees",
    price: 10500,
    image: "saree_web_bg_new_4.png",
    images: ["saree_web_bg_new_4.png", "saree_web_bg_new_4.png"],
    fabric: "Modern Silk Blend",
    description: "Unique copper-toned silk saree with a metallic sheen, perfect for experimental ethnic looks.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Contemporary copper zari", "Weight: 710 grams", "Wash: Dry clean only"],
    rating: 4.4,
    reviews: 30,
    inStock: true,
    source: 'public'
  },
  {
    name: "Rose Quartz Silk Saree",
    category: "sarees",
    price: 8900,
    image: "saree_web_bg_new_5.png",
    images: ["saree_web_bg_new_5.png", "saree_web_bg_new_5.png"],
    fabric: "Fine Silk",
    description: "Delicate rose pink saree with light zari work, offering a graceful and subtle look.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Subtle gold zari", "Weight: 650 grams", "Wash: Dry clean only"],
    rating: 4.6,
    reviews: 24,
    inStock: true,
    badge: "Trending",
    source: 'public'
  },
  {
    name: "Imperial Maroon Silk Saree",
    category: "sarees",
    price: 14200,
    image: "saree_web_bg_new_6.png",
    images: ["saree_web_bg_new_6.png", "saree_web_bg_new_6.png"],
    fabric: "Double Warp Pure Silk",
    description: "Rich imperial maroon saree with heavy border work, a masterpiece of traditional craftsmanship.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Pure gold zari", "Weight: 800 grams", "Wash: Dry clean only"],
    rating: 4.9,
    reviews: 18,
    inStock: true,
    source: 'public'
  },
  {
    name: "Azure Sky Silk Saree",
    category: "sarees",
    price: 11800,
    image: "saree_web_bg_set3_1.png",
    images: ["saree_web_bg_set3_1.png", "saree_web_bg_set3_1.png"],
    fabric: "Lustrous Silk",
    description: "Bright azure blue saree with contrasting borders, bringing a vibrant touch to your wardrobe.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: High-quality zari", "Weight: 700 grams", "Wash: Dry clean only"],
    rating: 4.7,
    reviews: 14,
    inStock: true,
    source: 'public'
  },
  {
    name: "Tangerine Dream Silk Saree",
    category: "sarees",
    price: 12900,
    image: "saree_web_bg_set3_2.png",
    images: ["saree_web_bg_set3_2.png", "saree_web_bg_set3_2.png"],
    fabric: "Pure Silk",
    description: "Vivid tangerine orange saree with intricate temple jewelry patterns woven into the borders.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: Gold plated zari", "Weight: 760 grams", "Wash: Dry clean only"],
    rating: 4.8,
    reviews: 9,
    inStock: true,
    badge: "New Season",
    source: 'public'
  },
  {
    name: "Emerald Empress Silk Saree",
    category: "sarees",
    price: 16500,
    image: "saree_web_bg_set3_3.png",
    images: ["saree_web_bg_set3_3.png", "saree_web_bg_set3_3.png"],
    fabric: "Grand Pure Silk",
    description: "Majestic emerald green saree with heavy gold zari, fit for royalty and grand celebrations.",
    details: ["Length: 6.3 meters with blouse piece", "Zari: 24k gold plated zari", "Weight: 840 grams", "Wash: Dry clean only"],
    rating: 5.0,
    reviews: 6,
    inStock: true,
    badge: "Elite Collection",
    source: 'public'
  },
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // Clear existing
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Seed Categories
    console.log('Seeding categories...');
    await Category.insertMany(categories);

    // Prepare Products and Copy Images
    console.log('Processing products and copying images...');
    const products = productsData.map(p => {
      const sourcePath = p.source === 'assets' 
        ? path.join(ASSETS_DIR, p.image) 
        : path.join(PUBLIC_DIR, p.image);
      const destPath = path.join(UPLOADS_DIR, p.image);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      } else {
        console.warn(`Warning: Image not found at ${sourcePath}`);
      }

      const imageUrl = `${BACKEND_URL}/uploads/${p.image}`;
      return {
        ...p,
        image: imageUrl,
        images: p.images.map(img => `${BACKEND_URL}/uploads/${img}`)
      };
    });

    // Seed Products
    console.log('Seeding products...');
    await Product.insertMany(products);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
