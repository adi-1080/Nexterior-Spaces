import express from 'express';
import {
  createOrUpdateUserPreference,
  getUserPreferences,
  updateUserPreferences,
  deleteUserPreferences
} from '../controllers/userPreference.js';

const router = express.Router();

// Create or Update user preferences
router.post('/', createOrUpdateUserPreference);

// Get user preferences by user ID
router.get('/:user_id', getUserPreferences);

// Update user preferences by preference ID
router.put('/:id', updateUserPreferences);

// Delete user preferences by preference ID
router.delete('/:id', deleteUserPreferences);

export default router;
