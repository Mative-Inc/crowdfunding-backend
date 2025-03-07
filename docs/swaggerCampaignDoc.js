/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - description
 *         - story
 *         - goal
 *         - category
 *         - amount
 *         - country
 *         - city
 *         - startDate
 *         - endDate
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user who created the campaign
 *         image:
 *           type: string
 *           description: URL of the campaign image
 *         title:
 *           type: string
 *           description: Title of the campaign
 *         description:
 *           type: string
 *           description: Short description of the campaign
 *         story:
 *           type: string
 *           description: Detailed story of the campaign
 *         goal:
 *           type: string
 *           description: Goal of the campaign
 *         category:
 *           type: string
 *           enum: [Education, Healthcare, Environment, Social, Technology, Other]
 *           description: Category of the campaign
 *         amount:
 *           type: number
 *           description: Target amount for the campaign
 *         country:
 *           type: string
 *           description: Country where the campaign is based
 *         city:
 *           type: string
 *           description: City where the campaign is based
 *         address:
 *           type: string
 *           description: Address for the campaign
 *         zipCode:
 *           type: string
 *           description: ZIP code of the campaign location
 *         video:
 *           type: string
 *           description: URL of the campaign video
 *         media:
 *           type: array
 *           items:
 *             type: string
 *           description: Additional media URLs
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the campaign
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the campaign
 *         status:
 *           type: string
 *           enum: [pending, active, inactive, completed, cancelled]
 *           default: pending
 *           description: Current status of the campaign
 *         donorCommunication:
 *           type: string
 *           description: Plan for communicating with donors
 *         isDeleted:
 *           type: boolean
 *           default: false
 *           description: Soft delete flag for the campaign
 * 
 * tags:
 *   name: Campaigns
 *   description: Campaign management API endpoints
 * 
 * /api/campaigns/create:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaigns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - User not logged in
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/get/{id}:
 *   get:
 *     summary: Get a campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Campaign retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/update/{id}:
 *   put:
 *     summary: Update a campaign
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User not authorized to update this campaign
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/delete/{id}:
 *   delete:
 *     summary: Soft delete a campaign
 *     description: Sets isDeleted flag to true. Cannot delete campaigns with donations.
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Campaign deleted successfully
 *       400:
 *         description: Cannot delete campaign with donations
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User not authorized to delete this campaign
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/getAllByUser/{userId}:
 *   get:
 *     summary: Get all campaigns by user ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of campaigns retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 *       401:
 *         description: Unauthorized - User not logged in
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/getAllWithDonations:
 *   get:
 *     summary: Get all active campaigns with donation summaries
 *     description: Retrieves all active campaigns with their donation information
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: List of campaigns with donations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Campaign'
 *                   - type: object
 *                     properties:
 *                       totalDonations:
 *                         type: number
 *                         description: Total amount donated to the campaign
 *                       donorCount:
 *                         type: number
 *                         description: Number of donors for the campaign
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/getAllByAdmin:
 *   get:
 *     summary: Get all campaigns (Admin only)
 *     description: Admin endpoint to get all campaigns including soft-deleted ones
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all campaigns retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/updateStatus/{id}:
 *   put:
 *     summary: Update campaign status (Admin only)
 *     description: Admin endpoint to update the status of a campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
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
 *                 enum: [pending, active, inactive, completed, cancelled]
 *                 description: New status for the campaign
 *     responses:
 *       200:
 *         description: Campaign status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 * 
 * /api/campaigns/getById/{id}:
 *   get:
 *     summary: Get campaign by ID with full details
 *     description: Get detailed campaign information for editing
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Campaign details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Campaign'
 *                 - type: object
 *                   properties:
 *                     donations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                           donorName:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 */