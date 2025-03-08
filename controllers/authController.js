import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, confirmPassword: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerAdmin = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, confirmPassword: hashedPassword, isAdmin: true });

        res.status(201).json({ message: 'Admin registered successfully', user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { profilePicture= '', name, email, role, password, confirmPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.profilePicture = profilePicture;
        user.name = name;
        user.email = email;
        user.role = role;
        user.password = hashedPassword;
        user.confirmPassword = hashedPassword;

        await user.save();
        
        res.status(200).json({ message: 'User updated successfully', user });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email, role: user.role, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        res.status(200).json({ message: 'Login successful', user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// forget password
export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = await sendPasswordResetOTPEmail(email);

        user.otp = otp.otp;
        user.otpExpiresAt = otp.expiresAt;

        await user.save();

        res.status(200).json({ message: 'Password reset token sent to email', id: user._id, otp,  });

    } catch (error) {       
        res.status(500).json({ message: error.message });
    }
};

// send password reset otp email
export const sendPasswordResetOTPEmail = async (email) => {
    try {
        console.log(`📩 Sending OTP email to: ${email}`); // Debug log
        
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}. It expires in 10 minutes.`,
        };

        console.log("📤 Sending email with options:", mailOptions);
        
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent! Message ID:", info.messageId);

        return { otp, expiresAt };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send OTP email.");
    }
};

// verify password reset otp
export const verifyPasswordResetOTP = async (req, res) => {
    const { id, otp } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        console.log(user.otp);
        console.log(otp);

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// reset password
export const resetPassword = async (req, res) => {
    const { id, newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        user.password = hashedPassword;
        user.confirmPassword = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get user profile
export const getUserProfile = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// add user by admin
export const addUserByAdmin = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, confirmPassword: hashedPassword, role });

        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};




