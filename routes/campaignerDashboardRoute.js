import express from "express";
import { getBasicInfo, getLatestDonations } from "../controllers/campaignerDashboardController.js";


const campaignerDashboardRouter = express.Router();

campaignerDashboardRouter.get("/basic-info/:userId", getBasicInfo);
campaignerDashboardRouter.get("/latest-donations/:userId", getLatestDonations);

export default campaignerDashboardRouter;
