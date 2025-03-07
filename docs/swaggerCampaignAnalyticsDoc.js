/**
 * @swagger
 * components:
 *   schemas:
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
 *         message: "Error fetching campaign statistics"
 *         error: "Database connection failed"
 * 
 *     CampaignStats:
 *       type: object
 *       required:
 *         - totalCampaigns
 *         - activeCampaigns
 *         - totalFundsRaised
 *         - successRate
 *       properties:
 *         totalCampaigns:
 *           type: integer
 *           description: Total number of non-deleted campaigns
 *           example: 1
 *         activeCampaigns:
 *           type: integer
 *           description: Number of currently active campaigns
 *           example: 1
 *         totalFundsRaised:
 *           type: number
 *           description: Total amount of funds raised from completed campaigns
 *           example: 50000
 *         successRate:
 *           type: number
 *           description: Percentage of campaigns that have been completed
 *           example: 25.5
 * 
 *     CampaignStatusStats:
 *       type: object
 *       properties:
 *         completionRate:
 *           type: number
 *           description: Percentage of campaigns that are completed
 *         statusDistribution:
 *           type: object
 *           description: Distribution of campaigns by status
 *           properties:
 *             pending:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of pending campaigns
 *                 percentage:
 *                   type: number
 *                   description: Percentage of pending campaigns
 *             active:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of active campaigns
 *                 percentage:
 *                   type: number
 *                   description: Percentage of active campaigns
 *             completed:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of completed campaigns
 *                 percentage:
 *                   type: number
 *                   description: Percentage of completed campaigns
 *             cancelled:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of cancelled campaigns
 *                 percentage:
 *                   type: number
 *                   description: Percentage of cancelled campaigns
 *             inactive:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of inactive campaigns
 *                 percentage:
 *                   type: number
 *                   description: Percentage of inactive campaigns
 *       example:
 *         completionRate: 30.0
 *         statusDistribution:
 *           pending:
 *             count: 20
 *             percentage: 13.33
 *           active:
 *             count: 80
 *             percentage: 53.33
 *           completed:
 *             count: 45
 *             percentage: 30.0
 *           cancelled:
 *             count: 3
 *             percentage: 2.0
 *           inactive:
 *             count: 2
 *             percentage: 1.33
 * 
 *     CampaignTrendsByStatus:
 *       type: object
 *       properties:
 *         pending:
 *           type: integer
 *           description: Number of pending campaigns
 *         active:
 *           type: integer
 *           description: Number of active campaigns
 *         completed:
 *           type: integer
 *           description: Number of completed campaigns
 *         cancelled:
 *           type: integer
 *           description: Number of cancelled campaigns
 *         inactive:
 *           type: integer
 *           description: Number of inactive campaigns
 * 
 *     MonthlyTrend:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           description: Three-letter month abbreviation (e.g., "Jan")
 *         total:
 *           type: integer
 *           description: Total number of campaigns in the month
 *         amount:
 *           type: number
 *           description: Total campaign goal amount for the month
 *         byStatus:
 *           $ref: '#/components/schemas/CampaignTrendsByStatus'
 * 
 *     CampaignTrends:
 *       type: object
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MonthlyTrend'
 *           description: Monthly campaign data for all months in the current year
 *         statistics:
 *           type: object
 *           properties:
 *             totalCampaigns:
 *               type: integer
 *               description: Total number of campaigns
 *             totalAmount:
 *               type: number
 *               description: Total campaign goal amount
 *             successRate:
 *               type: number
 *               description: Percentage of completed campaigns that reached their goals
 *             monthlyGrowth:
 *               type: number
 *               description: Growth rate compared to previous month
 *             yearToDate:
 *               type: object
 *               properties:
 *                 totalCampaigns:
 *                   type: integer
 *                   description: Year-to-date total number of campaigns
 *                 totalAmount:
 *                   type: number
 *                   description: Year-to-date total campaign goal amount
 *                 successRate:
 *                   type: number
 *                   description: Year-to-date success rate
 * 
 *     FundsRaisedData:
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
 *           description: Total funds raised in this month
 *           example: 45000
 * 
 *     FundsRaisedOverTime:
 *       type: object
 *       required:
 *         - data
 *         - statistics
 *       properties:
 *         data:
 *           type: array
 *           description: Monthly funds raised data from start of year to current month
 *           items:
 *             $ref: '#/components/schemas/FundsRaisedData'
 *         statistics:
 *           type: object
 *           required:
 *             - totalAmount
 *             - averageAmount
 *             - monthlyGrowth
 *           properties:
 *             totalAmount:
 *               type: number
 *               description: Total funds raised across all months
 *               example: 273000
 *             averageAmount:
 *               type: number
 *               description: Average funds raised per month
 *               example: 45500
 *             monthlyGrowth:
 *               type: number
 *               description: Growth rate compared to previous month (in percentage)
 *               example: 35.42
 * 
 *     DonationsByDate:
 *       type: object
 *       required:
 *         - _id
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: The date of the donations
 *           example: "2024-03-15"
 *         totalAmount:
 *           type: number
 *           description: Total amount of donations for this date
 *           example: 25000
 * 
 *     DonationsByCategory:
 *       type: object
 *       required:
 *         - _id
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: The category of the campaign
 *           example: "Education"
 *         totalAmount:
 *           type: number
 *           description: Total amount of donations for this category
 *           example: 75000
 * 
 * tags:
 *   name: Campaign Analytics
 *   description: Endpoints for retrieving campaign statistics and analytics
 * 
 * /api/analytics/campaign/stats:
 *   get:
 *     summary: Get campaign statistics overview
 *     description: |
 *       Retrieves key campaign statistics including:
 *       - Total number of campaigns
 *       - Number of active campaigns
 *       - Total funds raised from completed campaigns
 *       - Success rate (percentage of completed campaigns)
 *     tags: [Campaign Analytics]
 *     responses:
 *       200:
 *         description: Campaign statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignStats'
 *             example:
 *               totalCampaigns: 1
 *               activeCampaigns: 1
 *               totalFundsRaised: 50000
 *               successRate: 25.5
 *       500:
 *         description: Internal server error while fetching campaign statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/campaign/trends:
 *   get:
 *     summary: Get campaign trends for the current year
 *     description: |
 *       Retrieves monthly campaign trends and statistics for the current year, including:
 *       - Monthly campaign counts by status
 *       - Campaign goal amounts
 *       - Success rates and growth rates
 *       - Year-to-date statistics
 *     tags: [Campaign Analytics]
 *     responses:
 *       200:
 *         description: Campaign trends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignTrends'
 *             example:
 *               trends:
 *                 - month: "Jan"
 *                   total: 10
 *                   amount: 50000
 *                   byStatus:
 *                     pending: 2
 *                     active: 3
 *                     completed: 3
 *                     cancelled: 1
 *                     inactive: 1
 *               statistics:
 *                 totalCampaigns: 120
 *                 totalAmount: 600000
 *                 successRate: 75.5
 *                 monthlyGrowth: 15.2
 *                 yearToDate:
 *                   totalCampaigns: 80
 *                   totalAmount: 400000
 *                   successRate: 78.2
 *       500:
 *         description: Internal server error while fetching campaign trends
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/campaign/funds-trend:
 *   get:
 *     summary: Get funds raised over time
 *     description: Retrieves monthly funds raised data from the start of the current year up to the current month
 *     tags: [Campaign Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved funds raised over time
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FundsRaisedOverTime'
 *             example:
 *               data: [
 *                 { "month": "2024-01", "amount": 25000 },
 *                 { "month": "2024-02", "amount": 45000 },
 *                 { "month": "2024-03", "amount": 38000 }
 *               ]
 *               statistics:
 *                 totalAmount: 108000
 *                 averageAmount: 36000
 *                 monthlyGrowth: -15.56
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/campaign/funds-raised:
 *   get:
 *     summary: Get donations raised over time
 *     description: Retrieves the total amount of donations grouped by date, excluding deleted donations
 *     tags: [Campaign Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved donations by date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DonationsByDate'
 *             example: [
 *               {
 *                 "_id": "2024-03-15",
 *                 "totalAmount": 25000
 *               },
 *               {
 *                 "_id": "2024-03-16",
 *                 "totalAmount": 35000
 *               },
 *               {
 *                 "_id": "2024-03-17",
 *                 "totalAmount": 28000
 *               }
 *             ]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/campaign/donations-by-category:
 *   get:
 *     summary: Get donations grouped by campaign category
 *     description: |
 *       Retrieves the total amount of donations for each campaign category.
 *       The data is aggregated by joining campaigns with their donations and grouping by category.
 *       Deleted campaigns are excluded from the results.
 *     tags: [Campaign Analytics]
 *     responses:
 *       200:
 *         description: Successfully retrieved donations by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DonationsByCategory'
 *             example: [
 *               {
 *                 "_id": "Education",
 *                 "totalAmount": 75000
 *               },
 *               {
 *                 "_id": "Healthcare",
 *                 "totalAmount": 120000
 *               },
 *               {
 *                 "_id": "Environment",
 *                 "totalAmount": 45000
 *               },
 *               {
 *                 "_id": "Technology",
 *                 "totalAmount": 90000
 *               }
 *             ]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */ 