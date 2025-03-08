/**
 * @swagger
 * components:
 *   schemas:
 *     MonthlyData:
 *       type: object
 *       required:
 *         - month
 *         - amount
 *       properties:
 *         month:
 *           type: string
 *           description: Month in YYYY-MM format
 *           example: "2024-03"
 *         amount:
 *           type: number
 *           description: Total donation amount for the month
 *           example: 45000
 * 
 *     QuickStats:
 *       type: object
 *       required:
 *         - totalDonationAmount
 *         - monthlyGrowth
 *         - averageDonationAmount
 *         - currentMonth
 *         - lastMonth
 *         - campaignSuccessRate
 *         - donatersGrowth
 *         - totalDonaters
 *       properties:
 *         totalDonationAmount:
 *           type: number
 *           description: Total amount of all completed donations
 *           example: 150000
 *         monthlyGrowth:
 *           type: string
 *           description: Percentage growth in donations compared to last month
 *           example: "28.57%"
 *         averageDonationAmount:
 *           type: number
 *           description: Average amount per completed donation
 *           example: 1000.50
 *         currentMonth:
 *           $ref: '#/components/schemas/MonthlyData'
 *         lastMonth:
 *           $ref: '#/components/schemas/MonthlyData'
 *         campaignSuccessRate:
 *           type: number
 *           description: Percentage of campaigns that have been successfully completed
 *           example: 75.5
 *         donatersGrowth:
 *           type: number
 *           description: Percentage growth in number of donors compared to last month
 *           example: 15.25
 *         totalDonaters:
 *           type: integer
 *           description: Total number of users with donor role
 *           example: 500
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
 *         message: "Error fetching quick stats"
 *         error: "Database connection failed"
 * 
 * tags:
 *   name: Report Analytics
 *   description: Endpoints for retrieving analytical reports and statistics
 * 
 * /api/analytics/reports/quick-stats:
 *   get:
 *     summary: Get quick donation statistics
 *     description: |
 *       Retrieves key donation statistics including:
 *       - Total donation amount from completed donations
 *       - Monthly growth rate in donations
 *       - Average donation amount
 *       - Current and last month's donation amounts
 *       - Campaign success rate
 *       - Donor growth rate
 *       - Total number of donors
 *     tags: [Report Analytics]
 *     responses:
 *       200:
 *         description: Quick statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuickStats'
 *             example:
 *               totalDonationAmount: 150000
 *               monthlyGrowth: "28.57%"
 *               averageDonationAmount: 1000.50
 *               currentMonth:
 *                 month: "2024-03"
 *                 amount: 45000
 *               lastMonth:
 *                 month: "2024-02"
 *                 amount: 35000
 *               campaignSuccessRate: 75.5
 *               donatersGrowth: 15.25
 *               totalDonaters: 500
 *       500:
 *         description: Internal server error while fetching statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */ 