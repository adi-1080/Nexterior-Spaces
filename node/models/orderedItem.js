import mongoose from 'mongoose';

const orderedItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  furniture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FurnitureItem' },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  quantity: Number,
  furniture_price: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_production', 'ready', 'delivered'],
    default: 'pending'
  }
});

export default mongoose.model('OrderedItem', orderedItemSchema);
