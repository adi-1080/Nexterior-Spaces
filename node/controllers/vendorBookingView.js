import VendorBookingView from '../models/vendorBookingView.js';

// Create VendorBookingView
export const createVendorBookingView = async (req, res) => {
  try {
    const { vendor_id, order_id, user_id, ordered_item_id } = req.body;

    const newVendorBookingView = new VendorBookingView({
      vendor_id,
      order_id,
      user_id,
      ordered_item_id
    });

    await newVendorBookingView.save();
    res.status(201).json(newVendorBookingView);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all vendor booking views
export const getAllVendorBookingViews = async (req, res) => {
  try {
    const views = await VendorBookingView.find()
      .populate('vendor_id')
      .populate('order_id')
      .populate('user_id')
      .populate('ordered_item_id');
    res.status(200).json(views);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get vendor booking view by ID
export const getVendorBookingViewById = async (req, res) => {
  try {
    const view = await VendorBookingView.findById(req.params.id)
      .populate('vendor_id')
      .populate('order_id')
      .populate('user_id')
      .populate('ordered_item_id');

    if (!view) return res.status(404).json({ message: 'Vendor Booking View not found' });
    res.status(200).json(view);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update vendor booking view by ID
export const updateVendorBookingView = async (req, res) => {
  try {
    const { vendor_id, order_id, user_id, ordered_item_id } = req.body;

    const updatedView = await VendorBookingView.findByIdAndUpdate(
      req.params.id,
      { vendor_id, order_id, user_id, ordered_item_id },
      { new: true }
    );

    if (!updatedView) return res.status(404).json({ message: 'Vendor Booking View not found' });
    res.status(200).json(updatedView);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete vendor booking view by ID
export const deleteVendorBookingView = async (req, res) => {
  try {
    const deletedView = await VendorBookingView.findByIdAndDelete(req.params.id);
    if (!deletedView) return res.status(404).json({ message: 'Vendor Booking View not found' });
    res.status(200).json({ message: 'Vendor Booking View deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
