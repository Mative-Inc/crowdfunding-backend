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

        const stats={
            active: campaigns.find(campaign => campaign._id === 'active')?.totalCampaigns || 0,
            completed: campaigns.find(campaign => campaign._id === 'completed')?.totalCampaigns || 0,
            pending: campaigns.find(campaign => campaign._id === 'pending')?.totalCampaigns || 0,
            cancelled: campaigns.find(campaign => campaign._id === 'cancelled')?.totalCampaigns || 0,
            inactive: campaigns.find(campaign => campaign._id === 'inactive')?.totalCampaigns || 0,

        }

        res.status(200).json(stats);
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


export const getDonationsByCategory=async(req,res)=>{
    try {
        const donations=await Campaign.aggregate([
            {
                $match:{
                    deleted:false
                }
            },
            {
                $lookup:{
                    from:"donations",
                    localField:"_id",
                    foreignField:"campaignId",
                    as:"donations"
                }
            },
            {
                $unwind:"$donations"
            },
            {
                $group:{
                    _id:"$category",
                    totalAmount:{$sum:"$donations.amount"}
                }
            }
        ])
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



