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
 *         message: "Error fetching user analytics"
 *         error: "Database connection failed"
 * 
 *     UserStatusCount:
 *       type: object
 *       required:
 *         - count
 *         - percentage
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of users with this status
 *         percentage:
 *           type: number
 *           description: Percentage of total users with this status (rounded to 2 decimal places)
 *           example: 85.0
 * 
 *     UserRoleCount:
 *       type: object
 *       required:
 *         - count
 *         - percentage
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of users with this role
 *         percentage:
 *           type: number
 *           description: Percentage of total users with this role (rounded to 2 decimal places)
 *           example: 60.0
 * 
 *     UsersByStatus:
 *       type: object
 *       required:
 *         - active
 *         - inactive
 *         - suspended
 *       properties:
 *         active:
 *           $ref: '#/components/schemas/UserStatusCount'
 *         inactive:
 *           $ref: '#/components/schemas/UserStatusCount'
 *         suspended:
 *           $ref: '#/components/schemas/UserStatusCount'
 *       example:
 *         active:
 *           count: 850
 *           percentage: 85.0
 *         inactive:
 *           count: 100
 *           percentage: 10.0
 *         suspended:
 *           count: 50
 *           percentage: 5.0
 * 
 *     UsersByRole:
 *       type: object
 *       required:
 *         - campaignCreator
 *         - donor
 *         - admin
 *       properties:
 *         campaignCreator:
 *           $ref: '#/components/schemas/UserRoleCount'
 *         donor:
 *           $ref: '#/components/schemas/UserRoleCount'
 *         admin:
 *           $ref: '#/components/schemas/UserRoleCount'
 *       example:
 *         campaignCreator:
 *           count: 600
 *           percentage: 60.0
 *         donor:
 *           count: 350
 *           percentage: 35.0
 *         admin:
 *           count: 50
 *           percentage: 5.0
 * 
 *     UserAnalytics:
 *       type: object
 *       required:
 *         - totalUsers
 *         - activeUsers
 *         - activeUsersPercentage
 *         - newSignups
 *         - monthlyGrowth
 *         - usersByStatus
 *         - usersByRole
 *       properties:
 *         totalUsers:
 *           type: integer
 *           description: Total number of non-deleted users
 *           example: 1000
 *         activeUsers:
 *           type: integer
 *           description: Number of users with 'active' status
 *           example: 850
 *         activeUsersPercentage:
 *           type: number
 *           description: Percentage of total users that are active (rounded to 2 decimal places)
 *           example: 85.0
 *         newSignups:
 *           type: integer
 *           description: Number of new users registered in the current month
 *           example: 50
 *         monthlyGrowth:
 *           type: number
 *           description: Percentage growth in users compared to previous month (rounded to 2 decimal places)
 *           example: 15.2
 *         usersByStatus:
 *           $ref: '#/components/schemas/UsersByStatus'
 *         usersByRole:
 *           $ref: '#/components/schemas/UsersByRole'
 * 
 *     MonthlyUserStats:
 *       type: object
 *       required:
 *         - active
 *         - inactive
 *         - suspended
 *         - byRole
 *       properties:
 *         active:
 *           type: integer
 *           description: Number of active users registered this month
 *           example: 85
 *         inactive:
 *           type: integer
 *           description: Number of inactive users registered this month
 *           example: 10
 *         suspended:
 *           type: integer
 *           description: Number of suspended users registered this month
 *           example: 5
 *         byRole:
 *           type: object
 *           properties:
 *             campaignCreator:
 *               type: integer
 *               description: Number of campaign creators registered this month
 *               example: 60
 *             donor:
 *               type: integer
 *               description: Number of donors registered this month
 *               example: 35
 *             admin:
 *               type: integer
 *               description: Number of admins registered this month
 *               example: 5
 * 
 *     MonthlyUserTrend:
 *       type: object
 *       required:
 *         - month
 *         - total
 *         - byStatus
 *         - byRole
 *       properties:
 *         month:
 *           type: string
 *           description: Three-letter month abbreviation
 *           enum: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 *           example: "Jan"
 *         total:
 *           type: integer
 *           description: Total number of users registered in the month
 *           example: 100
 *         byStatus:
 *           $ref: '#/components/schemas/MonthlyUserStats'
 *         byRole:
 *           type: object
 *           properties:
 *             campaignCreator:
 *               type: integer
 *               example: 60
 *             donor:
 *               type: integer
 *               example: 35
 *             admin:
 *               type: integer
 *               example: 5
 * 
 *     YearToDateStats:
 *       type: object
 *       required:
 *         - totalUsers
 *         - activeUsers
 *         - activeUsersPercentage
 *         - roleDistribution
 *       properties:
 *         totalUsers:
 *           type: integer
 *           description: Total users registered from start of year to current date
 *           example: 1000
 *         activeUsers:
 *           type: integer
 *           description: Active users registered from start of year to current date
 *           example: 850
 *         activeUsersPercentage:
 *           type: number
 *           description: Percentage of active users year to date (rounded to 2 decimal places)
 *           example: 85.0
 *         roleDistribution:
 *           $ref: '#/components/schemas/UsersByRole'
 * 
 *     UserTrends:
 *       type: object
 *       required:
 *         - trends
 *         - statistics
 *       properties:
 *         trends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MonthlyUserTrend'
 *           description: Monthly user registration data for all months in current year
 *         statistics:
 *           type: object
 *           required:
 *             - yearToDate
 *             - monthlyGrowth
 *           properties:
 *             yearToDate:
 *               $ref: '#/components/schemas/YearToDateStats'
 *             monthlyGrowth:
 *               type: number
 *               description: Growth rate compared to previous month (rounded to 2 decimal places)
 *               example: 15.2
 * 
 *     RoleStats:
 *       type: object
 *       required:
 *         - role
 *         - count
 *         - percentage
 *       properties:
 *         role:
 *           type: string
 *           enum: ['campaign creator', 'donor', 'admin']
 *           description: User role
 *         count:
 *           type: integer
 *           description: Number of users with this role
 *         percentage:
 *           type: number
 *           description: Percentage of total users with this role (rounded to 2 decimal places)
 * 
 *     RoleBasedUsers:
 *       type: object
 *       required:
 *         - total
 *         - roles
 *       properties:
 *         total:
 *           type: integer
 *           description: Total number of non-deleted users
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RoleStats'
 *           description: Statistics for each user role
 *       example:
 *         total: 1000
 *         roles:
 *           - role: 'campaign creator'
 *             count: 600
 *             percentage: 60.00
 *           - role: 'donor'
 *             count: 350
 *             percentage: 35.00
 *           - role: 'admin'
 *             count: 50
 *             percentage: 5.00
 * 
 *     ActiveUsersByRole:
 *       type: object
 *       required:
 *         - activeUsersByRole
 *       properties:
 *         activeUsersByRole:
 *           type: object
 *           required:
 *             - admin
 *             - campaignCreator
 *             - donor
 *           properties:
 *             admin:
 *               type: integer
 *               description: Number of active admin users
 *               example: 2
 *             campaignCreator:
 *               type: integer
 *               description: Number of active campaign creator users
 *               example: 4
 *             donor:
 *               type: integer
 *               description: Number of active donor users
 *               example: 2
 * 
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: User's unique identifier
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email address
 *         role:
 *           type: string
 *           enum: ['campaign creator', 'donor', 'admin']
 *           description: User's role in the system
 *         status:
 *           type: string
 *           enum: ['active', 'inactive', 'suspended']
 *           description: Current status of the user
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user has admin privileges
 *         deleted:
 *           type: boolean
 *           description: Whether the user has been soft deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "John Doe"
 *         email: "john@example.com"
 *         role: "campaign creator"
 *         status: "active"
 *         isAdmin: false
 *         deleted: false
 *         createdAt: "2024-03-15T10:30:00Z"
 *         updatedAt: "2024-03-15T10:30:00Z"
 * 
 *     SuccessResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *       example:
 *         message: "Operation completed successfully"
 * 
 * tags:
 *   name: User Analytics
 *   description: Endpoints for retrieving user statistics and analytics
 * 
 * /api/analytics/users:
 *   get:
 *     summary: Get user analytics overview
 *     description: |
 *       Retrieves comprehensive user statistics including:
 *       - Total user count (excluding deleted users)
 *       - Active users count and percentage
 *       - New signups in current month
 *       - Monthly growth rate
 *       - Distribution by user status (active, inactive, suspended)
 *       - Distribution by user role (campaign creator, donor, admin)
 *       
 *       All percentage values are rounded to 2 decimal places.
 *       Growth rate is calculated as ((current - previous) / previous * 100).
 *     tags: [User Analytics]
 *     responses:
 *       200:
 *         description: User analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAnalytics'
 *             example:
 *               totalUsers: 1000
 *               activeUsers: 850
 *               activeUsersPercentage: 85.0
 *               newSignups: 50
 *               monthlyGrowth: 15.2
 *               usersByStatus:
 *                 active:
 *                   count: 850
 *                   percentage: 85.0
 *                 inactive:
 *                   count: 100
 *                   percentage: 10.0
 *                 suspended:
 *                   count: 50
 *                   percentage: 5.0
 *               usersByRole:
 *                 campaignCreator:
 *                   count: 600
 *                   percentage: 60.0
 *                 donor:
 *                   count: 350
 *                   percentage: 35.0
 *                 admin:
 *                   count: 50
 *                   percentage: 5.0
 *       500:
 *         description: Internal server error while fetching user analytics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/users/trends:
 *   get:
 *     summary: Get user registration trends
 *     description: |
 *       Retrieves monthly user registration trends for the current year, including:
 *       - Monthly registration counts for all 12 months
 *       - Distribution by user status per month
 *       - Distribution by user role per month
 *       - Year-to-date statistics
 *       - Monthly growth rates
 *       
 *       Data is aggregated by month and includes zero counts for months with no registrations.
 *       All percentage values are rounded to 2 decimal places.
 *     tags: [User Analytics]
 *     responses:
 *       200:
 *         description: User trends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTrends'
 *             example:
 *               trends:
 *                 - month: "Jan"
 *                   total: 100
 *                   byStatus:
 *                     active: 85
 *                     inactive: 10
 *                     suspended: 5
 *                   byRole:
 *                     campaignCreator: 60
 *                     donor: 35
 *                     admin: 5
 *               statistics:
 *                 yearToDate:
 *                   totalUsers: 1000
 *                   activeUsers: 850
 *                   activeUsersPercentage: 85.0
 *                   roleDistribution:
 *                     campaignCreator:
 *                       count: 600
 *                       percentage: 60.0
 *                     donor:
 *                       count: 350
 *                       percentage: 35.0
 *                     admin:
 *                       count: 50
 *                       percentage: 5.0
 *                 monthlyGrowth: 20.0
 *       500:
 *         description: Internal server error while fetching user trends
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/users/roles:
 *   get:
 *     summary: Get active users count by role
 *     description: |
 *       Retrieves the count of active users for each role:
 *       - Admin users
 *       - Campaign creator users
 *       - Donor users
 *       
 *       Only includes non-deleted users with 'active' status.
 *     tags: [User Analytics]
 *     responses:
 *       200:
 *         description: Active users count by role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActiveUsersByRole'
 *             example:
 *               activeUsersByRole:
 *                 admin: 2
 *                 campaignCreator: 4
 *                 donor: 2
 *       500:
 *         description: Internal server error while fetching role-based statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/users/all:
 *   get:
 *     summary: Get all non-deleted users
 *     description: Retrieves a list of all users that have not been deleted from the system.
 *     tags: [User Analytics]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error while fetching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/analytics/users/{userId}:
 *   delete:
 *     summary: Soft delete a user
 *     description: Marks a user as deleted in the system (soft delete).
 *     tags: [User Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               message: "User deleted successfully"
 *       500:
 *         description: Internal server error while deleting user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   patch:
 *     summary: Update user status
 *     description: Updates the status of a user (active, inactive, or suspended).
 *     tags: [User Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['active', 'inactive', 'suspended']
 *                 description: New status for the user
 *           example:
 *             status: "inactive"
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               message: "User status updated successfully"
 *       500:
 *         description: Internal server error while updating user status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */ 