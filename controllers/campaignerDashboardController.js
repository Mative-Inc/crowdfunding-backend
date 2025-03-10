import Campaign from "../models/campaignSchema.js";
import mongoose from "mongoose";
import Donation from "../models/donationSchema.js";

export const getBasicInfo = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        
        const fundsRaised= await Campaign.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId), deleted: false }
            },
            {
                $lookup: {
                    from: "donations",
                    localField: "_id",
                    foreignField: "campaignId",
                    as: "donations"
                }
            },
            {
                $addFields: {
                    totalDonations: { $sum: "$donations.amount" }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalDonations: 1
                }
            } 
        ]);

        const totalCampaigns= await Campaign.countDocuments({ userId: new mongoose.Types.ObjectId(userId), deleted: false });
        const totalActiveCampaigns= await Campaign.countDocuments({ userId: new mongoose.Types.ObjectId(userId), deleted: false, status: "active" });

        const successRate= totalActiveCampaigns/totalCampaigns;

        res.status(200).json({
            fundsRaised: fundsRaised[0]?.totalDonations || 0,
            totalCampaigns: totalCampaigns || 0,
            totalActiveCampaigns: totalActiveCampaigns || 0,
            successRate: successRate || 0
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch campaign" });
        console.log(error);
    }
}



export const getLatestDonations = async (req, res) => {
    const { userId } = req.params;

    try {
        const donations = await Donation.aggregate([
            {
                $lookup: {
                    from: "campaigns",
                    localField: "campaignId",
                    foreignField: "_id",
                    as: "campaign"
                }
            },
            {
                $unwind: "$campaign"
            },
            {
                $match: { 
                    "campaign.userId": new mongoose.Types.ObjectId(userId), // Filter campaigns created by the user
                    deleted: false
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "donorId", 
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $addFields: {
                    campaignName: "$campaign.title", 
                    userName: "$user.name",
                    userImage: "$user.image",
                    userEmail: "$user.email",
                    amount: "$amount"
                }
            },
            {
                $sort: { date: -1 } 
            }
        ]);

        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch donations" });
    }
};



