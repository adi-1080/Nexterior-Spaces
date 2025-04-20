import Order from '../models/order.js';

// Create an order
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      status,
      total_amount,
      delivery_address,
      created_at
    } = req.body;

    const newOrder = new Order({
      user_id,
      status,
      total_amount,
      delivery_address,
      created_at: created_at || new Date()
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders (optional filter by user)
export const getAllOrders = async (req, res) => {
  try {
    const { user_id } = req.query;
    const query = {};
    if (user_id) query.user_id = user_id;

    const orders = await Order.find(query).populate('user_id').sort({ created_at: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user_id');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const {
      user_id,
      status,
      total_amount,
      delivery_address,
      created_at
    } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        status,
        total_amount,
        delivery_address,
        created_at
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
