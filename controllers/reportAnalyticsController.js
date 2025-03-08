import Campaign from "../models/campaignSchema.js";
import Donation from "../models/donationSchema.js";
import User from "../models/userSchema.js";

export const getQuickStats = async (req, res) => {
    try {
        // Get total amount donated
        const totalAmountResult = await Donation.aggregate([
            {
                $match: {
                    status: "completed"
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

        // Get current and previous month donations
        const currentDate = new Date();
        // console.log(currentDate);

        const currentMonth = currentDate.getMonth(); // No +1 needed
        // console.log(currentMonth);

        const currentYear = currentDate.getFullYear();

        // Corrected date calculations
        const currentMonthStart = new Date(currentYear, currentMonth, 1);
        // console.log(currentMonthStart);

        const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
        const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);

        // Get current month donations
        const currentMonthResult = await Donation.aggregate([
            {
                $match: {
                    status: "completed",
                    date: { // Assuming 'date' is the correct field
                        $gte: currentMonthStart,
                        $lt: nextMonthStart
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        // Get last month donations
        const lastMonthResult = await Donation.aggregate([
            {
                $match: {
                    status: "completed",
                    date: { // Assuming 'date' is the correct field
                        $gte: lastMonthStart,
                        $lt: currentMonthStart
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);


        const currentMonthAmount = currentMonthResult.length > 0 ? currentMonthResult[0].totalAmount : 0;
        const lastMonthAmount = lastMonthResult.length > 0 ? lastMonthResult[0].totalAmount : 0;

        // Calculate growth percentage
        const growthPercentage = lastMonthAmount === 0
            ? currentMonthAmount > 0 ? 100 : 0
            : ((currentMonthAmount - lastMonthAmount) / lastMonthAmount) * 100;

        // Calculate average donation amount
        const donationCount = await Donation.countDocuments({ status: "completed" });
        const averageDonation = donationCount > 0 ? totalAmount / donationCount : 0;

        // campaign success rate
        const totalCampaigns = await Campaign.countDocuments();
        const successfulCampaigns = await Campaign.countDocuments({ status: "completed" });

        const campaignSuccessRate = (successfulCampaigns / totalCampaigns) * 100;

        // donaters stats
        const totalDonaters = await User.countDocuments({ role: "donor" });
        
        const newDonaters = await User.countDocuments({
            role: "donor",
            date: { $gte: lastMonthStart, $lt: currentMonthStart }
        });

        console.log(newDonaters);

        // Calculate previous month's total donors
        const previousMonthTotalDonaters = await User.countDocuments({
            role: "donor",
            createdAt: { $lt: currentMonthStart }
        });
        
        // New donors this month
        const newDonors = await User.countDocuments({
            role: "donor",
            createdAt: { $gte: lastMonthStart, $lt: currentMonthStart }
        });
        
        // Donor growth calculation
        const donatersGrowth = previousMonthTotalDonaters > 0
            ? (newDonors / previousMonthTotalDonaters) * 100
            : 0;

        
        

        res.status(200).json({
            totalDonationAmount: totalAmount,
            monthlyGrowth: growthPercentage.toFixed(2) + "%",
            averageDonationAmount: parseFloat(averageDonation.toFixed(2)),
            currentMonth: {
                month: currentMonthStart.toISOString().slice(0, 7),
                amount: currentMonthAmount
            },
            lastMonth: {
                month: lastMonthStart.toISOString().slice(0, 7),
                amount: lastMonthAmount
            },
            campaignSuccessRate: campaignSuccessRate,
            donatersGrowth: donatersGrowth,
            totalDonaters: totalDonaters,
        });

    } catch (error) {
        console.error("Error fetching quick stats:", error);
        res.status(500).json({
            message: "Error fetching quick stats",
            error: error.message
        });
    }
}; 



export const getDonationTrends = async (req, res) => {
    try {
        const donationTrends = await Donation.aggregate([
            {
                $match: { status: "completed" }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    donors: { $addToSet: "$donorId" },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
            },
            {
                $project: {
                    month: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            {
                                $cond: {
                                    if: { $lt: ["$_id.month", 10] },
                                    then: { $concat: ["0", { $toString: "$_id.month" }] }, 
                                    else: { $toString: "$_id.month" }
                                }
                            }
                        ]
                    },
                    totalAmount: 1,
                    totalDonors: { $size: "$donors" }
                }
            }
        ]);

        res.status(200).json(donationTrends);
    } catch (error) {
        console.error("Error fetching donation trends:", error);
        res.status(500).json({
            message: "Error fetching donation trends",
            error: error.message
        });
    }
};



export const getTopFiveDonationRaiserCampaigns = async (req, res) => {
    try {
        const topFiveCampaigns = await Campaign.aggregate([
            
            {
                $lookup: {
                    from: "donations",
                    localField: "_id",
                    foreignField: "campaignId",
                    as: "donations"
                }
            },
            {
                $unwind: "$donations"
            },
            {
                $group: {
                    _id: { id: "$_id", title: "$title" },
                    totalAmount: { $sum: "$donations.amount" }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: "$_id.title",
                    totalAmount: 1
                }
            },
            {
                $sort: { totalAmount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.status(200).json(topFiveCampaigns);
    } catch (error) {
        console.error("Error fetching top five donation campaigns:", error);
        res.status(500).json({
            message: "Error fetching top five donation campaigns",
            error: error.message
        });
    }
};



export const getCampaignMetrics = async (req, res) => {
    try {
        const campaignMetrics = await Campaign.aggregate([
            {
                $lookup: {
                    from: "donations",
                    localField: "_id",
                    foreignField: "campaignId",
                    as: "donations"
                }
            },
            {
                $unwind: {
                    path: "$donations",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },   // Include title in grouping
                    amount: { $first: "$amount" }, // Include total campaign goal
                    fundsRaised: { $sum: "$donations.amount" },
                    totalDonors: { $addToSet: "$donations.donorId" },
                    averageDonation: { $avg: "$donations.amount" } 
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    amount: 1,
                    fundsRaised: 1,
                    successRate: { 
                        $multiply: [
                            { $cond: [{ $gt: ["$amount", 0] }, { $divide: ["$fundsRaised", "$amount"] }, 0] }, 
                            100
                        ]
                    },
                    averageDonation: 1,
                    totalDonors: { $size: "$totalDonors" }
                }
            }
        ]);

        res.status(200).json(campaignMetrics);
    } catch (error) {
        console.error("Error fetching campaign metrics:", error);
        res.status(500).json({
            message: "Error fetching campaign metrics",
            error: error.message
        });
    }
};


export const getDonorGrowth = async (req, res) => {
    try {
        const donorGrowth = await User.aggregate([
            {
                $match: { role: "donor" }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalDonors: { $addToSet: "$_id" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $project: {
                    month: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            { $toString: "$_id.month" }
                        ]
                    },
                    totalDonors: { $size: "$totalDonors" }
                }
            }
        ]);

        res.status(200).json(donorGrowth);
        
    } catch (error) {
        console.error("Error fetching donor growth:", error);
        res.status(500).json({
            message: "Error fetching donor growth",
            error: error.message
        });
    }
}


export const getTopContributors = async (req, res) => {
    try {
        const topContributors = await Donation.aggregate([
            {
                $match: { status: "completed" }
            },
            {
                $group: {
                    _id: "$donorId",
                    totalDonations: { $sum: "$amount" },
                    numberOfDonations: { $sum: 1 },
                    lastDonation: { $last: "$date" }
                }
            },
            {
                $addFields: {
                    donorId: { $toObjectId: "$_id" } // Ensure ObjectId format
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "donorId",
                    foreignField: "_id",
                    as: "donorDetails"
                }
            },
            {
                $unwind: "$donorDetails"
            },
            {
                $project: {
                    _id: 1,
                    donorName: "$donorDetails.name",
                    numberOfDonations: 1,
                    lastDonation: 1,
                    totalDonations: 1
                }
            },
            {
                $sort: { totalDonations: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.status(200).json(topContributors);
    } catch (error) {
        console.error("Error fetching top contributors:", error);
        res.status(500).json({
            message: "Error fetching top contributors",
            error: error.message
        });
    }
};











