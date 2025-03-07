import express from 'express';
import { registerUser, loginUser, getUserProfile, forgetPassword, resetPassword, verifyPasswordResetOTP, updateUserProfile, registerAdmin } from '../controllers/authController.js';

const authRouter = express.Router();


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/register-admin', registerAdmin);
authRouter.post('/update-profile', updateUserProfile);


authRouter.get('/profile', getUserProfile);
authRouter.post('/forget-password', forgetPassword);
authRouter.post('/verify-password-reset-otp', verifyPasswordResetOTP);
authRouter.post('/reset-password', resetPassword);


export default authRouter;

