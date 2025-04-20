import FurnitureRecommendation from '../models/furnitureRecommendation.js';

// Create a recommendation
export const createFurnitureRecommendation = async (req, res) => {
  try {
    const {
      user_id,
      furniture_id,
      score,
      generated_at
    } = req.body;

    const newRecommendation = new FurnitureRecommendation({
      user_id,
      furniture_id,
      score,
      generated_at: generated_at || new Date()
    });

    await newRecommendation.save();
    res.status(201).json(newRecommendation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all recommendations
export const getAllFurnitureRecommendations = async (req, res) => {
  try {
    const recommendations = await FurnitureRecommendation.find()
      .populate('user_id')
      .populate('furniture_id');
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single recommendation by ID
export const getFurnitureRecommendationById = async (req, res) => {
  try {
    const recommendation = await FurnitureRecommendation.findById(req.params.id)
      .populate('user_id')
      .populate('furniture_id');

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a recommendation
export const updateFurnitureRecommendation = async (req, res) => {
  try {
    const {
      user_id,
      furniture_id,
      score,
      generated_at
    } = req.body;

    const updated = await FurnitureRecommendation.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        furniture_id,
        score,
        generated_at
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a recommendation
export const deleteFurnitureRecommendation = async (req, res) => {
  try {
    const deleted = await FurnitureRecommendation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
