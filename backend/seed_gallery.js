const mongoose = require('mongoose');
require('dotenv').config({ override: true });

const MONGO_URI = process.env.MONGO_URI;

const gallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: String,
  createdAt: { type: Date, default: Date.now },
});
const Gallery = mongoose.model('Gallery', gallerySchema);

const initialImages = [
  'http://localhost:7050/uploads/product-saree-1.jpg',
  'http://localhost:7050/uploads/product-saree-2.jpg',
  'http://localhost:7050/uploads/product-saree-3.jpg',
  'http://localhost:7050/uploads/product-saree-4.jpg',
  'http://localhost:7050/uploads/product-veshti-1.jpg',
  'http://localhost:7050/uploads/product-thundu-1.jpg',
];

async function seedGallery() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await Gallery.deleteMany({});
    
    const items = initialImages.map(img => ({
      image: img,
      caption: 'Initial Gallery Image'
    }));

    await Gallery.insertMany(items);
    console.log('Gallery seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedGallery();
