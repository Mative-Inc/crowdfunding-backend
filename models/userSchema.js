import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    profilePicture: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, default: 'campaign creator', enum: ['campaign creator', 'donor', 'admin'] },
    isAdmin: { type: Boolean, default: false },
    otp: { type: String, default: '' },
    otpExpiresAt: { type: Date, default: null },
    status: { type: String, default: 'active', enum: ['active', 'inactive', 'suspended'] },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
