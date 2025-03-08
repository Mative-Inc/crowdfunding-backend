import express from 'express';
import { getCampaignMetrics, getDonationTrends, getDonorGrowth, getQuickStats, getTopContributors, getTopFiveDonationRaiserCampaigns } from '../controllers/reportAnalyticsController.js';

const reportAnalyticsRouter = express.Router();

reportAnalyticsRouter.get('/quick-stats', getQuickStats);
reportAnalyticsRouter.get('/donation-trends', getDonationTrends);
reportAnalyticsRouter.get('/top-five-donation-raisers', getTopFiveDonationRaiserCampaigns);
reportAnalyticsRouter.get('/campaign-metrics', getCampaignMetrics);
reportAnalyticsRouter.get('/donor-growth', getDonorGrowth);
reportAnalyticsRouter.get('/top-contributers', getTopContributors);

export default reportAnalyticsRouter; 