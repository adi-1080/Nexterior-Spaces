import express from 'express';
import {
  createUserInteraction,
  getUserInteractions,
  getFurnitureInteractions,
  updateUserInteraction,
  deleteUserInteraction
} from '../controllers/userInteraction.js';

const router = express.Router();

// Create interaction
router.post('/', createUserInteraction);

// Get all interactions for a user
router.get('/user/:user_id', getUserInteractions);

// Get all interactions for a furniture item
router.get('/furniture/:furniture_id', getFurnitureInteractions);

// Update an interaction
router.put('/:id', updateUserInteraction);

// Delete an interaction
router.delete('/:id', deleteUserInteraction);

export default router;
