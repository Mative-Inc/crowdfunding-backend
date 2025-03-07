/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 * 
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with name, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or passwords do not match
 *       500:
 *         description: Server error
 *
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 *
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetch user profile by ID.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 *
 * /api/auth/forget-password:
 *   post:
 *     summary: Forget password
 *     description: Sends an OTP to reset the password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 *
 * /api/auth/verify-password-reset-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     description: Verifies OTP before resetting the password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Server error
 *
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Resets the user password using OTP verification.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Passwords do not match or user not found
 *       500:
 *         description: Server error
 * 
 * /api/auth/update-profile:
 *   post:
 *     summary: Update user profile
 *     description: Updates the user profile.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 * 
 * /api/auth/register-admin:
 *   post:
 *     summary: Register a new admin
 *     description: Creates a new admin with name, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: User already exists or passwords do not match
 *       500:
 *         description: Server error
 */ 
