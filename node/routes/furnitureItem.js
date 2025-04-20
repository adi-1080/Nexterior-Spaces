import express from 'express';
import {
  createFurnitureItem,
  getAllFurnitureItems,
  getFurnitureItemById,
  updateFurnitureItem,
  deleteFurnitureItem
} from '../controllers/furnitureItem.js'; 

const router = express.Router();

// @route   POST /api/furniture
// @desc    Create a new furniture item
router.post('/', createFurnitureItem);

// @route   GET /api/furniture
// @desc    Get all furniture items
router.get('/', getAllFurnitureItems);

// @route   GET /api/furniture/:id
// @desc    Get a single furniture item by ID
router.get('/:id', getFurnitureItemById);

// @route   PUT /api/furniture/:id
// @desc    Update a furniture item by ID
router.put('/:id', updateFurnitureItem);

// @route   DELETE /api/furniture/:id
// @desc    Delete a furniture item by ID
router.delete('/:id', deleteFurnitureItem);

export default router;
