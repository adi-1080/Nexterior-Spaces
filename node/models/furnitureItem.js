import mongoose from 'mongoose';

const furnitureItemSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }, // vendor posts furnitureItems
  name: String,
  description: String,
  tags: [String],
  style: String,
  material: String,
  color: String,
  dimensions: String,
  price: Number,
  image_url: String,
  uploaded_at: { type: Date, default: Date.now }
});

export default mongoose.model('FurnitureItem', furnitureItemSchema);
