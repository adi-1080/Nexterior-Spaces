import UserInteraction from '../models/userInteraction.js';

// Create interaction (track user action like view, click, etc.)
export const createUserInteraction = async (req, res) => {
  try {
    const { user_id, furniture_id, interaction_type } = req.body;

    // Validate interaction type
    const validInteractionTypes = ['view', 'click', 'like', 'save', 'purchase'];
    if (!validInteractionTypes.includes(interaction_type)) {
      return res.status(400).json({ message: 'Invalid interaction type' });
    }

    const newInteraction = new UserInteraction({
      user_id,
      furniture_id,
      interaction_type,
      timestamp: new Date()
    });

    await newInteraction.save();
    res.status(201).json(newInteraction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all interactions for a specific user
export const getUserInteractions = async (req, res) => {
  try {
    const interactions = await UserInteraction.find({ user_id: req.params.user_id }).populate('furniture_id');
    res.status(200).json(interactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all interactions for a specific furniture item
export const getFurnitureInteractions = async (req, res) => {
  try {
    const interactions = await UserInteraction.find({ furniture_id: req.params.furniture_id }).populate('user_id');
    res.status(200).json(interactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an interaction (if needed, for example changing interaction type)
export const updateUserInteraction = async (req, res) => {
  try {
    const { interaction_type } = req.body;

    // Validate interaction type
    const validInteractionTypes = ['view', 'click', 'like', 'save', 'purchase'];
    if (!validInteractionTypes.includes(interaction_type)) {
      return res.status(400).json({ message: 'Invalid interaction type' });
    }

    const updatedInteraction = await UserInteraction.findByIdAndUpdate(
      req.params.id,
      { interaction_type },
      { new: true }
    );

    if (!updatedInteraction) return res.status(404).json({ message: 'Interaction not found' });
    res.status(200).json(updatedInteraction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an interaction
export const deleteUserInteraction = async (req, res) => {
  try {
    const deletedInteraction = await UserInteraction.findByIdAndDelete(req.params.id);
    if (!deletedInteraction) return res.status(404).json({ message: 'Interaction not found' });
    res.status(200).json({ message: 'Interaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
