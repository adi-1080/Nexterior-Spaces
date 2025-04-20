import Wishlist from '../models/wishlist.js';

// Create Wishlist Item
export const createWishlistItem = async (req, res) => {
  try {
    const { user_id, furniture_id } = req.body;

    const newWishlistItem = new Wishlist({
      user_id,
      furniture_id
    });

    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Wishlist Items by User
export const getWishlistByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const wishlist = await Wishlist.find({ user_id })
      .populate('user_id')
      .populate('furniture_id');
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Wishlist Item by User and Furniture
export const getWishlistItemByUserAndFurniture = async (req, res) => {
  try {
    const { user_id, furniture_id } = req.params;
    const wishlistItem = await Wishlist.findOne({ user_id, furniture_id })
      .populate('user_id')
      .populate('furniture_id');
    if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });
    res.status(200).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Wishlist Item
export const removeWishlistItem = async (req, res) => {
  try {
    const { user_id, furniture_id } = req.params;
    const removedItem = await Wishlist.findOneAndDelete({ user_id, furniture_id });
    if (!removedItem) return res.status(404).json({ message: 'Wishlist item not found' });
    res.status(200).json({ message: 'Wishlist item removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove All Wishlist Items for a User
export const removeAllWishlistItemsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const removedItems = await Wishlist.deleteMany({ user_id });
    res.status(200).json({ message: `${removedItems.deletedCount} items removed from wishlist` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
