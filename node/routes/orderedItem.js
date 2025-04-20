import express from 'express';
import {
  createOrderedItem,
  getAllOrderedItems,
  getOrderedItemById,
  updateOrderedItem,
  deleteOrderedItem
} from '../controllers/orderedItem.js';

const router = express.Router();

router.post('/', createOrderedItem);         // Create new ordered item
router.get('/', getAllOrderedItems);         // Get all ordered items
router.get('/:id', getOrderedItemById);      // Get single ordered item
router.put('/:id', updateOrderedItem);       // Update ordered item
router.delete('/:id', deleteOrderedItem);    // Delete ordered item

export default router;
