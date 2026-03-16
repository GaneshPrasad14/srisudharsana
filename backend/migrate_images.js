const mongoose = require('mongoose');
require('dotenv').config({ override: true });

const MONGO_URI = process.env.MONGO_URI;

const productSchema = new mongoose.Schema({
  image: String,
  images: [String],
});
const Product = mongoose.model('Product', productSchema);

const gallerySchema = new mongoose.Schema({
  image: String,
});
const Gallery = mongoose.model('Gallery', gallerySchema);

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    for (let product of products) {
      let updated = false;
      if (product.image && product.image.includes('http://localhost:5000')) {
        product.image = product.image.replace('http://localhost:5000', 'http://localhost:7050');
        updated = true;
      }
      if (product.images && product.images.length > 0) {
        product.images = product.images.map(img => img.includes('http://localhost:5000') ? img.replace('http://localhost:5000', 'http://localhost:7050') : img);
        updated = true;
      }
      if (updated) {
        await product.save();
      }
    }
    console.log('Product images updated');

    const galleryItems = await Gallery.find({});
    console.log(`Found ${galleryItems.length} gallery items`);

    for (let item of galleryItems) {
      if (item.image && item.image.includes('http://localhost:5000')) {
        item.image = item.image.replace('http://localhost:5000', 'http://localhost:7050');
        await item.save();
      }
    }
    console.log('Gallery images updated');

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
