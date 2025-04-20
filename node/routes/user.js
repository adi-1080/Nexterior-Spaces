import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.js';

const router = express.Router();

// Get all users (admin use case)
router.get('/', getAllUsers);

// Get user by ID (for user profile or admin access)
router.get('/:id', getUserById);

// Update user details
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

export default router;
