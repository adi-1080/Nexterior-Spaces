import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Vendor from '../models/vendor.js';
// import redisClient from '../utils/redisClient.js';
import { sendOTPEmail } from '../utils/sendEmail.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const requestOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await redisClient.setEx(`otp:${email}`, 300, otp); // Key expires in 300s (5 min)
    await sendOTPEmail(email, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};


// Helper: Generate JWT
const generateToken = (id, role) => jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' });

export const registerUser = async (req, res) => {
    try {
      const { name, email, password, location, otp } = req.body;
    //   const storedOtp = await redisClient.get(`otp:${email}`);
    //   if (!storedOtp || storedOtp !== otp)
    //     return res.status(400).json({ error: 'Invalid or expired OTP' });
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'User already exists' });
  
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed, location });
      const token = generateToken(user._id, 'user');
  
      // await redisClient.del(`otp:${email}`);
  
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(500).json({ error: 'User registration failed' });
    }
  };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken(user._id, 'user');
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'User login failed' });
  }
};

export const registerVendor = async (req, res) => {
    try {
      const { name, email, password, location, otp } = req.body;
    //   const storedOtp = await redisClient.get(`otp:${email}`);
    //   if (!storedOtp || storedOtp !== otp)
    //     return res.status(400).json({ error: 'Invalid or expired OTP' });
  
      const existing = await Vendor.findOne({ email });
      if (existing) return res.status(400).json({ error: 'Vendor already exists' });
  
      const hashed = await bcrypt.hash(password, 10);
      const vendor = await Vendor.create({ name, email, password: hashed, location });
      const token = generateToken(vendor._id, 'vendor');
  
      await redisClient.del(`otp:${email}`);
  
      res.status(201).json({ vendor, token });
    } catch (err) {
      res.status(500).json({ error: 'Vendor registration failed' });
    }
  };

export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    const valid = await bcrypt.compare(password, vendor.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken(vendor._id, 'vendor');
    res.json({ vendor, token });
  } catch (err) {
    res.status(500).json({ error: 'Vendor login failed' });
  }
};
