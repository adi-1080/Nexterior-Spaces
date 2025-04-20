import mongoose from 'mongoose';

const userInteractionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  furniture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FurnitureItem' },
  interaction_type: { type: String, enum: ['view', 'click', 'like', 'save', 'purchase'] },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('UserInteraction', userInteractionSchema);
