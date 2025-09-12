const mongoose = require('mongoose');
const Product = require('./Model/StyleModel');

const MONGODB_URI = 'mongodb+srv://saridelavanyarajeswari:Jf3YO2V1mkc0OAfv@cluster0.yqf6pxf.mongodb.net/ProductData?retryWrites=true&w=majority';

async function fixExactImagePath() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const oldPath = 'shirts/printedshirt/grey.jpg';
    const newPath = 'shirts/printedshirts/grey.jpg';

    // Find ONLY products with the EXACT old path
    const products = await Product.find({ Image: oldPath });

    if (products.length === 0) {
      console.log('⚠️ No products found with the exact path:', oldPath);
      return;
    }

    console.log(`🔍 Found ${products.length} products with path: "${oldPath}"`);

    // Update ALL matching records in one query (more efficient)
    await Product.updateMany(
      { Image: oldPath },
      { $set: { Image: newPath } }
    );

    console.log(`🔁 Updated ${products.length} records:`);
    console.log(`"${oldPath}" → "${newPath}"`);
    console.log('🎉 Exact path updated successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

fixExactImagePath();