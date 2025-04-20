import UserPreference from '../models/userPreference.js';

// Create or Update user preferences (if preferences for the user already exist, update them)
export const createOrUpdateUserPreference = async (req, res) => {
  try {
    const { user_id, preferred_styles, preferred_materials, preferred_colors, budget_min, budget_max, room_type } = req.body;

    // Check if preferences for the user already exist
    let preferences = await UserPreference.findOne({ user_id });

    if (preferences) {
      // Update existing preferences
      preferences = await UserPreference.findByIdAndUpdate(
        preferences._id,
        { preferred_styles, preferred_materials, preferred_colors, budget_min, budget_max, room_type },
        { new: true }
      );
      return res.status(200).json(preferences);
    }

    // Create new preferences if not found
    const newPreferences = new UserPreference({
      user_id,
      preferred_styles,
      preferred_materials,
      preferred_colors,
      budget_min,
      budget_max,
      room_type
    });

    await newPreferences.save();
    res.status(201).json(newPreferences);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user preferences by user ID
export const getUserPreferences = async (req, res) => {
  try {
    const preferences = await UserPreference.findOne({ user_id: req.params.user_id });
    if (!preferences) return res.status(404).json({ message: 'Preferences not found' });
    res.status(200).json(preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user preferences
export const updateUserPreferences = async (req, res) => {
  try {
    const { preferred_styles, preferred_materials, preferred_colors, budget_min, budget_max, room_type } = req.body;

    const updatedPreferences = await UserPreference.findByIdAndUpdate(
      req.params.id,
      { preferred_styles, preferred_materials, preferred_colors, budget_min, budget_max, room_type },
      { new: true }
    );

    if (!updatedPreferences) return res.status(404).json({ message: 'Preferences not found' });
    res.status(200).json(updatedPreferences);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user preferences
export const deleteUserPreferences = async (req, res) => {
  try {
    const deletedPreferences = await UserPreference.findByIdAndDelete(req.params.id);
    if (!deletedPreferences) return res.status(404).json({ message: 'Preferences not found' });
    res.status(200).json({ message: 'Preferences deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
