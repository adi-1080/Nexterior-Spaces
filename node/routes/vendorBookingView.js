import express from 'express';
import {
  createVendorBookingView,
  getAllVendorBookingViews,
  getVendorBookingViewById,
  updateVendorBookingView,
  deleteVendorBookingView
} from '../controllers/vendorBookingView.js';

const router = express.Router();

// Create vendor booking view
router.post('/', createVendorBookingView);

// Get all vendor booking views
router.get('/', getAllVendorBookingViews);

// Get vendor booking view by ID
router.get('/:id', getVendorBookingViewById);

// Update vendor booking view by ID
router.put('/:id', updateVendorBookingView);

// Delete vendor booking view by ID
router.delete('/:id', deleteVendorBookingView);

export default router;
