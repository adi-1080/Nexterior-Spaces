import mongoose from 'mongoose';

const furnitureRecommendationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  furniture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FurnitureItem' },
  score: Number,
  generated_at: { type: Date, default: Date.now }
});

export default mongoose.model('FurnitureRecommendation', furnitureRecommendationSchema);
