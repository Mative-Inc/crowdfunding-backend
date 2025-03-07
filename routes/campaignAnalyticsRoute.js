import { Router } from 'express';
import express from 'express';
import { getAllCampaigns, getCampaignByStatus, getCampaignStats, getDonationsRaisedOverTime, getTopCampaigns } from '../controllers/campaignAnalyticsController.js';

const campaignAnalyticsRouter = express.Router();

campaignAnalyticsRouter.get('/stats', getCampaignStats);
campaignAnalyticsRouter.get('/status', getCampaignByStatus);
campaignAnalyticsRouter.get('/funds-raised', getDonationsRaisedOverTime);
campaignAnalyticsRouter.get('/top-campaigns', getTopCampaigns);
campaignAnalyticsRouter.get('/all-campaigns', getAllCampaigns);

export default campaignAnalyticsRouter;
