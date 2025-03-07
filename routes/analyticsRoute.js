import express from 'express';
import { getCampaignTrends, getDashboardStats, getDonationTrends, getRecentActivity } from '../controllers/analyticsController.js';


const analyticsRouter = express.Router();

analyticsRouter.get('/', getDashboardStats);
analyticsRouter.get('/donation-trends', getDonationTrends);
analyticsRouter.get('/campaign-trends', getCampaignTrends);
analyticsRouter.get('/recent-activity', getRecentActivity);


export default analyticsRouter; 