import { Router } from 'express';
import express from 'express';
import { getCampaignByStatus, getCampaignStats, getDonationsByCategory, getDonationsRaisedOverTime } from '../controllers/campaignAnalyticsController.js';

const campaignAnalyticsRouter = express.Router();

campaignAnalyticsRouter.get('/stats', getCampaignStats);
campaignAnalyticsRouter.get('/status', getCampaignByStatus);
campaignAnalyticsRouter.get('/funds-raised', getDonationsRaisedOverTime);
campaignAnalyticsRouter.get('/donations-by-category', getDonationsByCategory);

export default campaignAnalyticsRouter;
