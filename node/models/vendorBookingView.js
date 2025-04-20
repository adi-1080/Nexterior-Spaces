import mongoose from 'mongoose';

const vendorBookingViewSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ordered_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderedItem' }
});

export default mongoose.model('VendorBookingView', vendorBookingViewSchema);
