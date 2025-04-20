import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  location: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Vendor', vendorSchema);
