import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  preferred_styles: [String],
  preferred_materials: [String],
  preferred_colors: [String],
  budget_min: Number,
  budget_max: Number,
  room_type: String // E.g., bedroom, living room, etc.
});

export default mongoose.model('UserPreference', userPreferenceSchema);
