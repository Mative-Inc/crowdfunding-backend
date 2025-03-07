/**
 * @swagger
 * components:
 *   schemas:
 *     DonationStats:
 *       type: object
 *       required:
 *         - totalDonations
 *         - totalAmount
 *         - currentMonthDonations
 *         - lastMonthDonations
 *         - monthlyGrowth
 *         - avergeDonation
 *         - donationsFailed
 *         - donationsCompleted
 *         - failedPercentage
 *         - completedPercentage
 *       properties:
 *         totalDonations:
 *           type: integer
 *           description: Total number of donations made
 *           example: 150
 *         totalAmount:
 *           type: number
 *           description: Total amount of all donations
 *           example: 150000
 *         currentMonthDonations:
 *           type: number
 *           description: Total donations amount for current month
 *           example: 45000
 *         lastMonthDonations:
 *           type: number
 *           description: Total donations amount for last month
 *           example: 35000
 *         monthlyGrowth:
 *           type: string
 *           description: Percentage growth in donations compared to last month
 *           example: "28.57%"
 *         avergeDonation:
 *           type: number
 *           description: Average amount per donation
 *           example: 1000
 *         donationsFailed:
 *           type: integer
 *           description: Number of failed donations
 *           example: 5
 *         donationsCompleted:
 *           type: integer
 *           description: Number of completed donations
 *           example: 145
 *         failedPercentage:
 *           type: number
 *           description: Percentage of failed donations
 *           example: 3.33
 *         completedPercentage:
 *           type: number
 *           description: Percentage of completed donations
 *           example: 96.67
 * 
 *     DonationTrend:
 *       type: object
 *       required:
 *         - _id
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: Date of the donations
 *           example: "2024-03-15"
 *         totalAmount:
 *           type: number
 *           description: Total donation amount for that date
 *           example: 25000
 * 
 *     PaymentMethodStats:
 *       type: object
 *       required:
 *         - _id
 *         - totalAmount
 *         - percentage
 *       properties:
 *         _id:
 *           type: string
 *           description: Payment method name
 *           example: "credit_card"
 *         totalAmount:
 *           type: number
 *           description: Total amount donated through this payment method
 *           example: 75000
 *         percentage:
 *           type: number
 *           description: Percentage of total donations using this payment method
 *           example: 0.45
 * 
 *     TopCampaign:
 *       type: object
 *       required:
 *         - campaignId
 *         - title
 *         - totalAmount
 *       properties:
 *         campaignId:
 *           type: string
 *           description: Campaign ID
 *           example: "65f1a2b3c4d5e6f7g8h9i0j1"
 *         title:
 *           type: string
 *           description: Campaign title
 *           example: "Education Fund"
 *         totalAmount:
 *           type: number
 *           description: Total amount donated to this campaign
 *           example: 50000
 * 
 *     Transaction:
 *       type: object
 *       required:
 *         - _id
 *         - amount
 *         - campaignId
 *         - donorId
 *       properties:
 *         _id:
 *           type: string
 *           description: Transaction ID
 *           example: "65f1a2b3c4d5e6f7g8h9i0j1"
 *         amount:
 *           type: number
 *           description: Donation amount
 *           example: 1000
 *         campaignId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Campaign ID
 *               example: "65f1a2b3c4d5e6f7g8h9i0j1"
 *             title:
 *               type: string
 *               description: Campaign title
 *               example: "Education Fund"
 *         donorId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Donor ID
 *               example: "65f1a2b3c4d5e6f7g8h9i0j1"
 *             name:
 *               type: string
 *               description: Donor name
 *               example: "John Doe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Transaction date
 *           example: "2024-03-15T10:30:00Z"
 *         paymentMethod:
 *           type: string
 *           description: Method of payment
 *           example: "credit_card"
 *         status:
 *           type: string
 *           enum: [completed, failed]
 *           description: Status of the donation
 *           example: "completed"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message describing what went wrong
 *         error:
 *           type: string
 *           description: Detailed error message or stack trace
 *       example:
 *         message: "Error fetching donation statistics"
 *         error: "Database connection failed"
 * 
 * tags:
 *   name: Donation Analytics
 *   description: Endpoints for retrieving donation statistics and analytics
 * 
 * /api/analytics/donations/stats:
 *   get:
 *     summary: Get donation statistics overview
 *     description: |
 *       Retrieves key donation statistics including:
 *       - Total number of donations
 *       - Total donation amount
 *       - Current month's donations
 *       - Last month's donations
 *       - Monthly growth rate
 *       - Average donation amount
 *       - Donation success/failure statistics
 *     tags: [Donation Analytics]
 *     responses:
 *       200:
 *         description: Donation statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DonationStats'
 *             example:
 *               totalDonations: 150
 *               totalAmount: 150000
 *               currentMonthDonations: 45000
 *               lastMonthDonations: 35000
 *               monthlyGrowth: "28.57%"
 *               avergeDonation: 1000
 *               donationsFailed: 5
 *               donationsCompleted: 145
 *               failedPercentage: 3.33
 *               completedPercentage: 96.67
 *       500:
 *         description: Internal server error while fetching donation statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/donations/trends:
 *   get:
 *     summary: Get donation trends by date
 *     description: Retrieves the total donations grouped by date
 *     tags: [Donation Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved donation trends
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trends:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DonationTrend'
 *             example:
 *               trends: [
 *                 { "_id": "2024-03-15", "totalAmount": 25000 },
 *                 { "_id": "2024-03-16", "totalAmount": 35000 },
 *                 { "_id": "2024-03-17", "totalAmount": 28000 }
 *               ]
 *       500:
 *         description: Server error while fetching donation trends
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/donations/payment-methods:
 *   get:
 *     summary: Get donation distribution by payment method
 *     description: Retrieves the total amount and percentage of donations for each payment method
 *     tags: [Donation Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved payment method statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentMethods:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PaymentMethodStats'
 *             example:
 *               paymentMethods: [
 *                 { "_id": "credit_card", "totalAmount": 75000, "percentage": 0.45 },
 *                 { "_id": "bank_transfer", "totalAmount": 50000, "percentage": 0.30 },
 *                 { "_id": "paypal", "totalAmount": 41666, "percentage": 0.25 }
 *               ]
 *       500:
 *         description: Server error while fetching payment method statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/donations/top-campaigns:
 *   get:
 *     summary: Get top 5 campaigns by donation amount
 *     description: Retrieves the top 5 campaigns that have received the highest total donations, including campaign titles
 *     tags: [Donation Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved top campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topCampaigns:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TopCampaign'
 *             example:
 *               topCampaigns: [
 *                 {
 *                   "campaignId": "65f1a2b3c4d5e6f7g8h9i0j1",
 *                   "title": "Education Fund",
 *                   "totalAmount": 50000
 *                 },
 *                 {
 *                   "campaignId": "65f1a2b3c4d5e6f7g8h9i0j2",
 *                   "title": "Healthcare Initiative",
 *                   "totalAmount": 45000
 *                 }
 *               ]
 *       500:
 *         description: Server error while fetching top campaigns
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/donations/all-transactions:
 *   get:
 *     summary: Get all donation transactions
 *     description: Retrieves all donation transactions with campaign and donor details
 *     tags: [Donation Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *             example:
 *               transactions: [
 *                 {
 *                   "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
 *                   "amount": 1000,
 *                   "campaignId": {
 *                     "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
 *                     "title": "Education Fund"
 *                   },
 *                   "donorId": {
 *                     "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
 *                     "name": "John Doe"
 *                   },
 *                   "createdAt": "2024-03-15T10:30:00Z",
 *                   "paymentMethod": "credit_card",
 *                   "status": "completed"
 *                 }
 *               ]
 *       500:
 *         description: Server error while fetching transactions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */ 