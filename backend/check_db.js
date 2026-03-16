const mongoose = require('mongoose');
require('dotenv').config({ override: true });

const MONGO_URI = process.env.MONGO_URI;

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
});
const Product = mongoose.model('Product', productSchema);

async function check() {
  await mongoose.connect(MONGO_URI);
  const products = await Product.find({}, 'name image').limit(5);
  console.log('Sample Products:', JSON.stringify(products, null, 2));
  process.exit(0);
}

check();
