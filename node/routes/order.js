import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrder);                // Create new order
router.get('/', getAllOrders);                // Get all orders (optionally filter by user_id)
router.get('/:id', getOrderById);             // Get order by ID
router.put('/:id', updateOrder);              // Update order
router.delete('/:id', deleteOrder);           // Delete order

export default router;
