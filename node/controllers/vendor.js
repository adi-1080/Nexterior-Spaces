import Vendor from '../models/vendor.js';

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update vendor by ID
export const updateVendor = async (req, res) => {
  try {
    const { name, email, location } = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, email, location },
      { new: true }
    );

    if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });
    res.status(200).json(updatedVendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete vendor by ID
export const deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
