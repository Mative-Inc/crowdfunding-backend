/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       required:
 *         - donorId
 *         - campaignId
 *         - amount
 *         - donorName
 *         - donorEmail
 *         - paymentMethod
 *       properties:
 *         donorId:
 *           type: string
 *           description: ID of the donor (references User model)
 *         campaignId:
 *           type: string
 *           description: ID of the campaign being donated to (references Campaign model)
 *         amount:
 *           type: number
 *           description: Amount being donated
 *           minimum: 1
 *         donorName:
 *           type: string
 *           description: Name of the donor
 *         donorEmail:
 *           type: string
 *           format: email
 *           description: Email of the donor
 *         companyName:
 *           type: string
 *           description: Optional company name for corporate donations
 *         postalCode:
 *           type: string
 *           description: Postal code of the donor
 *         city:
 *           type: string
 *           description: City of the donor
 *         houseNumber:
 *           type: string
 *           description: House number of the donor
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of donation
 *           default: Current date-time
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           default: pending
 *           description: Status of the donation
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, debit_card, paypal, bank_transfer]
 *           default: credit_card
 *           description: Method of payment
 *         transactionId:
 *           type: string
 *           description: Payment transaction ID
 *         transactionStatus:
 *           type: string
 *           description: Status of the payment transaction
 *         deleted:
 *           type: boolean
 *           description: Whether the donation is deleted
 * 
 * tags:
 *   name: Donations
 *   description: Donation management API endpoints
 * 
 * /api/donations:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donorId
 *               - campaignId
 *               - amount
 *               - donorName
 *               - donorEmail
 *               - paymentMethod
 *             properties:
 *               donorId:
 *                 type: string
 *               campaignId:
 *                 type: string
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               donorName:
 *                 type: string
 *               donorEmail:
 *                 type: string
 *                 format: email
 *               companyName:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               city:
 *                 type: string
 *               houseNumber:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, paypal, bank_transfer]
 *           example:
 *             donorId: "60d5ecb8b5c9c62b3c7c1b9b"
 *             campaignId: "60d5ecb8b5c9c62b3c7c1b9a"
 *             amount: 100
 *             donorName: "John Doe"
 *             donorEmail: "john@example.com"
 *             companyName: "Acme Inc"
 *             postalCode: "12345"
 *             city: "New York"
 *             houseNumber: "123"
 *             paymentMethod: "credit_card"
 *     responses:
 *       201:
 *         description: Donation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 * 
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all donations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donation'
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 * 
 * /api/donations/{id}:
 *   get:
 *     summary: Get a donation by ID
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donation ID
 *     responses:
 *       200:
 *         description: Donation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Internal server error
 * 
 * /api/donations/campaign/{id}:
 *   get:
 *     summary: Get all donations for a specific campaign
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: List of donations for the campaign retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 * 
 * /api/donations/donor/{id}:
 *   get:
 *     summary: Get all donations by a specific donor
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donor ID
 *     responses:
 *       200:
 *         description: List of donations by the donor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Donor not found
 *       500:
 *         description: Internal server error
 */ 