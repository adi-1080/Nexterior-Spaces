import express from 'express';
import {
  createFurnitureRecommendation,
  getAllFurnitureRecommendations,
  getFurnitureRecommendationById,
  updateFurnitureRecommendation,
  deleteFurnitureRecommendation
} from '../controllers/furnitureRecommendation.js';

const router = express.Router();

router.post('/', createFurnitureRecommendation);
router.get('/', getAllFurnitureRecommendations);
router.get('/:id', getFurnitureRecommendationById);
router.put('/:id', updateFurnitureRecommendation);
router.delete('/:id', deleteFurnitureRecommendation);

export default router;
