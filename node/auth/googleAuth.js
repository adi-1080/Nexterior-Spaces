import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req, res) => {
  const { token, role } = req.body; // role = 'user' or 'vendor'

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let Model = role === 'vendor' ? Vendor : User;
    let existing = await Model.findOne({ email });

    if (!existing) {
      existing = await Model.create({
        name,
        email,
        password: '', // or any placeholder
        location: 'unknown'
      });
    }

    const jwtToken = jwt.sign(
      { id: existing._id, email: existing.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token: jwtToken, user: existing });
  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};
