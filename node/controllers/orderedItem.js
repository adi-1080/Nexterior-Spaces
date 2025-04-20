import OrderedItem from '../models/orderedItem.js';

// Create
export const createOrderedItem = async (req, res) => {
  try {
    const {
      order_id,
      furniture_id,
      vendor_id,
      quantity,
      furniture_price,
      status
    } = req.body;

    const newOrderedItem = new OrderedItem({
      order_id,
      furniture_id,
      vendor_id,
      quantity,
      furniture_price,
      status
    });

    await newOrderedItem.save();
    res.status(201).json(newOrderedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
export const getAllOrderedItems = async (req, res) => {
  try {
    const items = await OrderedItem.find()
      .populate('order_id')
      .populate('furniture_id')
      .populate('vendor_id');

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read by ID
export const getOrderedItemById = async (req, res) => {
  try {
    const item = await OrderedItem.findById(req.params.id)
      .populate('order_id')
      .populate('furniture_id')
      .populate('vendor_id');

    if (!item) return res.status(404).json({ message: 'Ordered item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateOrderedItem = async (req, res) => {
  try {
    const {
      order_id,
      furniture_id,
      vendor_id,
      quantity,
      furniture_price,
      status
    } = req.body;

    const updatedItem = await OrderedItem.findByIdAndUpdate(
      req.params.id,
      {
        order_id,
        furniture_id,
        vendor_id,
        quantity,
        furniture_price,
        status
      },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: 'Ordered item not found' });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteOrderedItem = async (req, res) => {
  try {
    const deletedItem = await OrderedItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Ordered item not found' });

    res.status(200).json({ message: 'Ordered item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
