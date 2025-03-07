/**
 * @swagger
 * components:
 *   schemas:
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
 *                   type: number
 *                 percentage:
 *                   type: number
 *             active:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 percentage:
 *                   type: number
 *             completed:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 percentage:
 *                   type: number
 *             cancelled:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 percentage:
 *                   type: number
 *             inactive:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 percentage:
 *                   type: number
 *         successRate:
 *           type: number
 *           description: Percentage of completed campaigns that reached their goals
 * 
 *     DashboardOverview:
 *       type: object
 *       properties:
 *         totalCampaigns:
 *           type: number
 *           description: Total number of active campaigns
 *         campaignGrowth:
 *           type: number
 *           description: Percentage growth in campaigns from last month
 *         campaignStats:
 *           $ref: '#/components/schemas/CampaignStatusStats'
 *         totalUsers:
 *           type: number
 *           description: Total number of registered users
 *         userGrowth:
 *           type: number
 *           description: Percentage growth in users from last month
 *         totalDonations:
 *           type: number
 *           description: Total amount of completed donations
 *         donationGrowth:
 *           type: number
 *           description: Percentage growth in completed donations from last month
 * 
 *     MonthlyDonation:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           description: Month abbreviation (Jan, Feb, etc.)
 *         amount:
 *           type: number
 *           description: Total donation amount for the month
 *         count:
 *           type: number
 *           description: Number of donations for the month
 * 
 *     DonationTrends:
 *       type: object
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MonthlyDonation'
 *           description: Monthly donation data for the last 6 months
 *         statistics:
 *           type: object
 *           properties:
 *             totalAmount:
 *               type: number
 *               description: Total donation amount over the period
 *             totalCount:
 *               type: number
 *               description: Total number of donations over the period
 *             averageDonation:
 *               type: number
 *               description: Average donation amount
 *             monthlyGrowth:
 *               type: number
 *               description: Percentage growth from previous month
 * 
 *     YearlyDonationTrends:
 *       type: object
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: Month abbreviation (Jan, Feb, etc.)
 *               amount:
 *                 type: number
 *                 description: Total donation amount for the month
 *               count:
 *                 type: number
 *                 description: Number of donations for the month
 *           description: Monthly donation data for all months in the current year
 *         statistics:
 *           type: object
 *           properties:
 *             totalAmount:
 *               type: number
 *               description: Total donation amount for the year
 *             totalCount:
 *               type: number
 *               description: Total number of donations for the year
 *             averageDonation:
 *               type: number
 *               description: Average donation amount for the year
 *             monthlyGrowth:
 *               type: number
 *               description: Percentage growth from previous month
 *             yearToDate:
 *               type: object
 *               properties:
 *                 totalAmount:
 *                   type: number
 *                   description: Total donation amount year to date
 *                 totalCount:
 *                   type: number
 *                   description: Total number of donations year to date
 *                 averageDonation:
 *                   type: number
 *                   description: Average donation amount year to date
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
 *     StatusDistribution:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of campaigns in this status
 *         percentage:
 *           type: number
 *           description: Percentage of total campaigns in this status
 * 
 *     CampaignTrends:
 *       type: object
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MonthlyTrend'
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
 *             statusDistribution:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/StatusDistribution'
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
 *     Activity:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: ['New Campaign Created', 'Large Donation Received', 'Campaign Goal Reached']
 *           description: Type of activity
 *         title:
 *           type: string
 *           description: Title of the campaign or donation details
 *         details:
 *           type: string
 *           description: Additional information (creator name for campaigns, amount for completed campaigns)
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the activity occurred
 * 
 *     RecentActivities:
 *       type: object
 *       properties:
 *         activities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Activity'
 *           description: List of most recent activities (up to 3 items - latest campaign, donation, and completed campaign)
 * 
 *     UserStatusCount:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of users with this status
 *         percentage:
 *           type: number
 *           description: Percentage of total users with this status
 * 
 *     UserAnalytics:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *           description: Total number of users (excluding deleted)
 *         activeUsers:
 *           type: integer
 *           description: Number of users with active status
 *         activeUsersPercentage:
 *           type: number
 *           description: Percentage of total users that are active
 *         newSignups:
 *           type: integer
 *           description: Number of new users registered this month
 *         monthlyGrowth:
 *           type: number
 *           description: Percentage growth in users from last month
 *         usersByStatus:
 *           type: object
 *           properties:
 *             active:
 *               $ref: '#/components/schemas/UserStatusCount'
 *             inactive:
 *               $ref: '#/components/schemas/UserStatusCount'
 *             suspended:
 *               $ref: '#/components/schemas/UserStatusCount'
 * 
 *     MonthlyUserTrend:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           description: Three-letter month abbreviation (e.g., "Jan")
 *         total:
 *           type: integer
 *           description: Total number of users registered in the month
 *         byStatus:
 *           type: object
 *           properties:
 *             active:
 *               type: integer
 *               description: Number of active users registered this month
 *             inactive:
 *               type: integer
 *               description: Number of inactive users registered this month
 *             suspended:
 *               type: integer
 *               description: Number of suspended users registered this month
 * 
 *     UserTrends:
 *       type: object
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MonthlyUserTrend'
 *         statistics:
 *           type: object
 *           properties:
 *             yearToDate:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   description: Total users registered year to date
 *                 activeUsers:
 *                   type: integer
 *                   description: Active users registered year to date
 *                 activeUsersPercentage:
 *                   type: number
 *                   description: Percentage of active users year to date
 *             monthlyGrowth:
 *               type: number
 *               description: Growth rate compared to previous month
 * 
 * tags:
 *   name: Analytics
 *   description: Analytics and dashboard statistics endpoints
 * 
 * /api/analytics/dashboard:
 *   get:
 *     summary: Get dashboard overview statistics
 *     description: Retrieve key metrics including campaign status distribution and growth rates
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardOverview'
 *             example:
 *               totalCampaigns: 150
 *               campaignGrowth: 25.5
 *               campaignStats:
 *                 completionRate: 30.0
 *                 statusDistribution:
 *                   pending:
 *                     count: 20
 *                     percentage: 13.33
 *                   active:
 *                     count: 80
 *                     percentage: 53.33
 *                   completed:
 *                     count: 45
 *                     percentage: 30.0
 *                   cancelled:
 *                     count: 3
 *                     percentage: 2.0
 *                   inactive:
 *                     count: 2
 *                     percentage: 1.33
 *                 successRate: 75.5
 *               totalUsers: 1000
 *               userGrowth: 15.2
 *               totalDonations: 50000
 *               donationGrowth: 30.0
 *       500:
 *         description: Internal server error
 * 
 * /api/analytics/donation-trends:
 *   get:
 *     summary: Get yearly donation trends
 *     description: Retrieve donation trends for all months in the current year
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Donation trends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YearlyDonationTrends'
 *             example:
 *               trends:
 *                 - month: "Jan"
 *                   amount: 45000
 *                   count: 150
 *                 - month: "Feb"
 *                   amount: 52000
 *                   count: 180
 *                 - month: "Mar"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Apr"
 *                   amount: 0
 *                   count: 0
 *                 - month: "May"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Jun"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Jul"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Aug"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Sep"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Oct"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Nov"
 *                   amount: 0
 *                   count: 0
 *                 - month: "Dec"
 *                   amount: 0
 *                   count: 0
 *               statistics:
 *                 totalAmount: 97000
 *                 totalCount: 330
 *                 averageDonation: 293.94
 *                 monthlyGrowth: 15.56
 *                 yearToDate:
 *                   totalAmount: 97000
 *                   totalCount: 330
 *                   averageDonation: 293.94
 *       500:
 *         description: Internal server error
 * 
 * /api/analytics/campaign-trends:
 *   get:
 *     summary: Get campaign trends for the current year
 *     description: Retrieves monthly campaign trends and statistics for the current year, including campaign counts by status, amounts, and success rates
 *     tags: [Analytics]
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
 *                 statusDistribution:
 *                   pending: { count: 20, percentage: 16.67 }
 *                   active: { count: 35, percentage: 29.17 }
 *                   completed: { count: 45, percentage: 37.50 }
 *                   cancelled: { count: 12, percentage: 10.00 }
 *                   inactive: { count: 8, percentage: 6.67 }
 *                 yearToDate:
 *                   totalCampaigns: 80
 *                   totalAmount: 400000
 *                   successRate: 78.2
 *       500:
 *         description: Internal server error while fetching campaign trends
 * 
 * /api/analytics/recent-activity:
 *   get:
 *     summary: Get most recent platform activities
 *     description: Retrieves the latest campaign creation, large donation (≥$1000), and completed campaign from the last 30 days
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Recent activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecentActivities'
 *             example:
 *               activities:
 *                 - type: "New Campaign Created"
 *                   title: "Save the Forests"
 *                   details: "by John Smith"
 *                   timestamp: "2024-03-15T10:30:00Z"
 *                 - type: "Large Donation Received"
 *                   title: "$5,000 - Clean Water Initiative"
 *                   details: ""
 *                   timestamp: "2024-03-15T07:30:00Z"
 *                 - type: "Campaign Goal Reached"
 *                   title: "Education for All"
 *                   details: "$80,000"
 *                   timestamp: "2024-03-14T10:30:00Z"
 *       500:
 *         description: Internal server error while fetching recent activities
 * 
 * 
 */ 