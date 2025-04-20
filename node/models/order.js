import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  total_amount: Number,
  delivery_address: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
