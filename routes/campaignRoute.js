import express from 'express';
import { createCampaign, getCampaign, updateCampaign, deleteCampaign, getAllCampaignsByUser, getCampaignsWithDonations, getAllCampaignsByAdmin, updateCampaignStatus, getCampaignById } from '../controllers/campaignController.js';


const campaignRouter = express.Router();

campaignRouter.post('/create', createCampaign);
campaignRouter.get('/get/:id', getCampaign);
campaignRouter.put('/update/:id', updateCampaign);
campaignRouter.delete('/delete/:id', deleteCampaign);
campaignRouter.get('/getAllByUser/:userId', getAllCampaignsByUser);
campaignRouter.get('/getAllWithDonations', getCampaignsWithDonations);
campaignRouter.get('/getAllByAdmin', getAllCampaignsByAdmin);
campaignRouter.put('/updateStatus/:id', updateCampaignStatus);
// get campaign by id for edit
campaignRouter.get('/getById/:id', getCampaignById);


export default campaignRouter;
