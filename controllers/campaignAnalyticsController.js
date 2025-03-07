import Campaign from "../models/campaignSchema.js";
import Donation from "../models/donationSchema.js";

export const getCampaignStats = async (req, res) => {
    try {
        // Get total campaigns (excluding deleted)
        const totalCampaigns = await Campaign.countDocuments({ deleted: false });

        // Get active campaigns
        const activeCampaigns = await Campaign.countDocuments({
            deleted: false,
            status: 'active'
        });

        // Get total funds raised from completed campaigns
        const fundsData = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    totalFundsRaised: { $sum: '$amount' }
                }
            }
        ]);

        const totalFundsRaised = fundsData.length > 0 ? fundsData[0].totalFundsRaised : 0;

        // Get completed campaigns count for success rate
        const completedCampaigns = await Campaign.countDocuments({
            deleted: false,
            status: 'completed'
        });

        // Calculate success rate
        const successRate = totalCampaigns > 0 
            ? parseFloat(((completedCampaigns / totalCampaigns) * 100).toFixed(2))
            : 0;

        res.status(200).json({
            totalCampaigns,
            activeCampaigns,
            totalFundsRaised,
            successRate
        });

    } catch (error) {
        console.error('Error fetching campaign statistics:', error);
        res.status(500).json({
            message: 'Error fetching campaign statistics',
            error: error.message
        });
    }
}; 


export const getCampaignByStatus = async (req, res) => {
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: { deleted: false } // Ignore deleted campaigns
            },
            {
                $group: {
                    _id: "$status", // Group by status
                    totalCampaigns: { $sum: 1 } // Count campaigns for each status
                }
            }
        ]);

        const statsArray = [
            { status: "active", total: campaigns.find(c => c._id === "active")?.totalCampaigns || 0 },
            { status: "completed", total: campaigns.find(c => c._id === "completed")?.totalCampaigns || 0 },
            { status: "pending", total: campaigns.find(c => c._id === "pending")?.totalCampaigns || 0 },
            { status: "cancelled", total: campaigns.find(c => c._id === "cancelled")?.totalCampaigns || 0 },
            { status: "inactive", total: campaigns.find(c => c._id === "inactive")?.totalCampaigns || 0 },
        ];

        res.status(200).json(statsArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getDonationsRaisedOverTime=async(req,res)=>{
    try {
        const donations=await Donation.aggregate([
            {
                $match:{
                    deleted:false
                }
            },
            {
                $group:{
                    _id:"$date",
                    totalAmount:{$sum:"$amount"}
                }
            }
        ])
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const getTopCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: {
                    deleted: false // Ignore deleted campaigns
                }
            },
            {
                $sort: {
                    amount: -1 // Sort campaigns in descending order based on amount
                }
            },
            {
                $limit: 5 // Get only the top 5 campaigns
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    amount: 1,
                    status: 1,
                    createdAt: 1
                }
            }
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error("Error fetching top campaigns:", error);
        res.status(500).json({ message: "Error fetching top campaigns", error: error.message });
    }
};


// get all campaigns by status Admin can see all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: { deleted: false }
            },
            {
                $lookup: {
                    from: "donations", // Ensure this matches your actual collection name
                    localField: "_id",
                    foreignField: "campaignId",
                    as: "donations"
                }
            },
            {
                $addFields: {
                    totalDonations: { $sum: "$donations.amount" },
                    lastDonationDate: { $max: "$donations.date" }
                }
            },
            {
                $lookup: {
                    from: "users", // Ensure this matches your actual users collection name
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    "userDetails.name": 1,
                    "userDetails.email": 1,
                    image: 1,
                    title: 1,
                    description: 1,
                    city: 1,
                    createdAt: 1,
                    amount: 1,
                    status: 1,
                    startDate: 1,
                    endDate: 1,
                    totalDonations: 1,
                    lastDonationDate: 1
                }
            }
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};



