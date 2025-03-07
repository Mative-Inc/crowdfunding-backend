import Campaign from '../models/campaignSchema.js';
import Donation from "../models/donationSchema.js";
import mongoose from "mongoose";

// Create a campaign

export const createCampaign = async (req, res) => {

    try {
        const { userId, image, title, description, story, goal, category, amount, country, city, address, zipCode, video, media, startDate, endDate, donorCommunication } = req.body;
        const campaign = new Campaign({ userId, image, title, description, story, goal, category, amount, country, city, address, zipCode, video, media, startDate, endDate, donorCommunication });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single campaign

export const getCampaign = async (req, res) => {
    const { id } = req.params;

    try {
        const campaign = await Campaign.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) } // Filter by campaign ID
            },
            {
                $lookup: {
                    from: "users", // Ensure this matches the actual collection name in MongoDB
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $lookup: {
                    from: "donations", // Ensure this matches the actual collection name in MongoDB
                    localField: "_id",
                    foreignField: "campaignId",
                    as: "donations"
                }
            },
            {
                $unwind: { path: "$donations", preserveNullAndEmptyArrays: true } // Unwind donations array for nested lookup
            },
            {
                $lookup: {
                    from: "users", // Assuming donations have a donorId referencing users collection
                    localField: "donations.donorId",
                    foreignField: "_id",
                    as: "donations.donorDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    image: { $first: "$image" },
                    title: { $first: "$title" },
                    story: { $first: "$story" },
                    goal: { $first: "$goal" },
                    amount: { $first: "$amount" },
                    city: { $first: "$city" },
                    video: { $first: "$video" },
                    media: { $first: "$media" },
                    createdAt: { $first: "$createdAt" },
                    status: { $first: "$status" },
                    totalDonations: {
                        $sum: { $toDouble: "$donations.amount" }
                    },
                    lastDonationDate: { $max: "$donations.date" },
                    userDetails: { $first: "$userDetails" },
                    donations: { $push: "$donations" } // Reconstruct the donations array
                }
            },
            {
                $project: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    story: 1,
                    goal: 1,
                    amount: 1,
                    city: 1,
                    video: 1,
                    media: 1,
                    createdAt: 1,
                    totalDonations: 1,
                    lastDonationDate: 1,
                    status: 1,

                    userDetails: { _id: 1, name: 1, email: 1, profilePicture: 1 },
                    donations: {
                        donationId: 1,
                        amount: 1,
                        date: 1,
                        donorDetails: { _id: 1, name: 1, email: 1, profilePicture: 1 }
                    }
                }
            }
        ]);

        console.log("campaign", campaign);

        if (!campaign || campaign.length === 0) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json(campaign[0]); // Return the first matching campaign
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch campaign details" });
    }
};




// // Get all campaigns
// export const getAllCampaigns = async (req, res) => {
//     try {
//         const campaigns = await Campaign.find().populate('userId');
//         res.status(200).json(campaigns);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


export const getCampaignById = async (req, res) => {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findById(id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a campaign
export const updateCampaign = async (req, res) => {
    const { id } = req.params;
    try {
        const { userId, image, title, description, story, goal, category, amount, country, city, address, zipCode, video, media, startDate, endDate, status = "active", donorCommunication } = req.body;
        const campaign = await Campaign.findByIdAndUpdate(id, { userId, image, title, description, story, goal, category, amount, country, city, address, zipCode, video, media, startDate, endDate, status, donorCommunication });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a campaign
export const deleteCampaign = async (req, res) => {
    const { id } = req.params;
    try {
        await Campaign.findByIdAndUpdate(id, { deleted: true });

        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all campaigns by user
export const getAllCampaignsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: { userId: userId, deleted: false } // Only include active campaigns

            },
            {
                $lookup: {
                    from: "donations", // Ensure this matches the actual collection name in MongoDB
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
                $project: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    description: 1,
                    city: 1,
                    createdAt: 1,
                    amount: 1,
                    totalDonations: 1,
                    lastDonationDate: 1
                }
            }
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};



// Get all campaigns with donations only active campaigns user can see
export const getCampaignsWithDonations = async (req, res) => {
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: { status: "active", deleted: false } // Only include active campaigns
            },
            {
                $lookup: {
                    from: "donations", // Ensure this matches the actual collection name in MongoDB
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
                $project: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    category: 1,
                    description: 1,
                    city: 1,
                    createdAt: 1,
                    amount: 1,
                    totalDonations: 1,
                    lastDonationDate: 1
                }
            }
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};


// admin


// get all campaigns by status Admin can see all campaigns
export const getAllCampaignsByAdmin = async (req, res) => {
    try {
        const campaigns = await Campaign.aggregate([
            {
                $match: { deleted: false }
            },
            {
                $lookup: {
                    from: "donations", // Ensure this matches the actual collection name in MongoDB
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
                $project: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    description: 1,
                    city: 1,
                    createdAt: 1,
                    amount: 1,
                    totalDonations: 1,
                    lastDonationDate: 1
                }
            }
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};



// update campaign status
export const updateCampaignStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const campaign = await Campaign.findByIdAndUpdate(id, { status });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};










