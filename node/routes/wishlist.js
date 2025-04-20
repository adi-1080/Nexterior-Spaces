import express from 'express';
import {
  createWishlistItem,
  getWishlistByUser,
  getWishlistItemByUserAndFurniture,
  removeWishlistItem,
  removeAllWishlistItemsByUser
} from '../controllers/wishlist.js';

const router = express.Router();

// Create Wishlist Item
router.post('/', createWishlistItem);

// Get Wishlist Items by User
router.get('/:user_id', getWishlistByUser);

// Get Wishlist Item by User and Furniture
router.get('/:user_id/:furniture_id', getWishlistItemByUserAndFurniture);

// Remove Wishlist Item
router.delete('/:user_id/:furniture_id', removeWishlistItem);

// Remove All Wishlist Items by User
router.delete('/:user_id/all', removeAllWishlistItemsByUser);

export default router;
