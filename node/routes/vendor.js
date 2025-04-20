import express from 'express';
import {
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from '../controllers/vendor.js';

const router = express.Router();

// Get all vendors
router.get('/', getAllVendors);

// Get vendor by ID
router.get('/:id', getVendorById);

// Update vendor by ID
router.put('/:id', updateVendor);

// Delete vendor by ID
router.delete('/:id', deleteVendor);

export default router;
