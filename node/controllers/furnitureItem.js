import FurnitureItem from '../models/furnitureItem.js';

// Create
export const createFurnitureItem = async (req, res) => {
  try {
    const {
      vendor_id,
      name,
      description,
      tags,
      style,
      material,
      color,
      dimensions,
      price,
      image_url
    } = req.body;

    const newItem = new FurnitureItem({
      vendor_id,
      name,
      description,
      tags,
      style,
      material,
      color,
      dimensions,
      price,
      image_url,
      uploaded_at: new Date()
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
export const getAllFurnitureItems = async (req, res) => {
  try {
    const items = await FurnitureItem.find().populate('vendor_id');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read by ID
export const getFurnitureItemById = async (req, res) => {
  try {
    const item = await FurnitureItem.findById(req.params.id).populate('vendor_id');
    if (!item) return res.status(404).json({ message: 'Furniture item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateFurnitureItem = async (req, res) => {
  try {
    const item = await FurnitureItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Furniture item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteFurnitureItem = async (req, res) => {
  try {
    const item = await FurnitureItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Furniture item not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
