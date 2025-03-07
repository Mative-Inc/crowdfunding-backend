import Campaign from "../models/campaignSchema.js";
import Donation from "../models/donationSchema.js";

export const createDonation = async (req, res) => {
    const { donorId, campaignId, amount, donorName, donorEmail, companyName, postalCode, city, houseNumber } = req.body;
    try {
        const donation = await Donation.create({ donorId, campaignId, amount, donorName, donorEmail, companyName, postalCode, city, houseNumber });
        const totalDonations = await Donation.find({ campaignId: campaignId });
        const totalAmount = totalDonations.reduce((acc, curr) => acc + curr.amount, 0);

        const campaign = await Campaign.findById(campaignId);
        if(totalAmount >= campaign.amount){
            const campaign = await Campaign.findByIdAndUpdate(campaignId, {status: 'completed', currentAmount: totalAmount});
            await campaign.save();
        }
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        console.log("runing", donations)
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDonationsByCampaignId = async (req, res) => {
    try {
        console.log("runing", req.params.id)
        const donations = await Donation.find({ campaignId: req.params.id });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDonationsByDonorId = async (req, res) => {
    try {
        const donations = await Donation.find({ donorId: req.params.id });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
