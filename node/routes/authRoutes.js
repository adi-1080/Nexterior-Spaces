import express from 'express';
import {
  requestOTP,
  registerUser,
  loginUser,
  registerVendor,
  loginVendor
} from '../controllers/authController.js';

const router = express.Router();

router.post('/request/otp', requestOTP);

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

router.post('/vendor/register', registerVendor);
router.post('/vendor/login', loginVendor);

export default router;