import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  furniture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FurnitureItem' }
});

wishlistSchema.index({ user_id: 1, furniture_id: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
