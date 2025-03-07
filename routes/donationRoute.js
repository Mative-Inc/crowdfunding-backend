import express from "express";
import { createDonation, getDonations, getDonationById, getDonationsByCampaignId, getDonationsByDonorId } from "../controllers/donationController.js";

const donationRouter = express.Router();

donationRouter.post("/", createDonation);
donationRouter.get("/", getDonations);
donationRouter.get("/:id", getDonationById);
donationRouter.get("/campaign/:id", getDonationsByCampaignId);
donationRouter.get("/donor/:id", getDonationsByDonorId);

export default donationRouter;


