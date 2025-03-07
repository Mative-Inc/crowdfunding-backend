import express from 'express';
import { getDonationStats, getDonationTrends, getDonationPercentageByPaymentMethod, getTopCampaigns, getAllTransactions } from '../controllers/donationAnalyticsController.js';


const donationAnalyticsRouter = express.Router();

donationAnalyticsRouter.get('/stats', getDonationStats);
donationAnalyticsRouter.get('/trends', getDonationTrends);
donationAnalyticsRouter.get('/payment-methods', getDonationPercentageByPaymentMethod);
donationAnalyticsRouter.get('/top-campaigns', getTopCampaigns);
donationAnalyticsRouter.get('/all-transactions', getAllTransactions);



export default donationAnalyticsRouter; 