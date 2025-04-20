import User from '../models/user.js';

// Read all users (admin use case or for listing purposes)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');  // Exclude password from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read user by ID (for the user profile page or admin access)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user details (e.g., profile update)
export const updateUser = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    // Optionally hash password if provided
    let updatedPassword = password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        location,
        password: updatedPassword || undefined
      },
      { new: true } // Return updated user
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
