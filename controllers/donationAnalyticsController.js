import Campaign from "../models/campaignSchema.js";
import Donation from "../models/donationSchema.js";

export const getDonationStats = async (req, res) => {
    try {
        // Get total number of donations
        const totalDonations = await Donation.countDocuments();
        

        const donationsFailed=await Donation.countDocuments({status:"failed"})
    
        const donationsCompleted=await Donation.countDocuments({status:"completed"})
        
        const failedPercentage=(donationsFailed/totalDonations)*100
        const completedPercentage=(donationsCompleted/totalDonations)*100

        // Get total amount donated
        const totalAmountResult = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

        // Get donation amounts for current and last month
        const monthlyDonations = await Donation.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } } // Sort in descending order
        ]);

        // Extract current and last month amounts
        const currentMonth = monthlyDonations[0] || { totalAmount: 0 };
        const lastMonth = monthlyDonations[1] || { totalAmount: 0 };

        // Calculate growth percentage
        const growthPercentage =
            lastMonth.totalAmount === 0
                ? currentMonth.totalAmount > 0
                    ? 100
                    : 0
                : ((currentMonth.totalAmount - lastMonth.totalAmount) / lastMonth.totalAmount) * 100;


        const avergeDonation=totalAmount/totalDonations

        res.status(200).json({
            totalDonations,
            totalAmount,
            currentMonthDonations: currentMonth.totalAmount,
            lastMonthDonations: lastMonth.totalAmount,
            monthlyGrowth: growthPercentage.toFixed(2) + "%", // Convert to percentage format
            avergeDonation,

            donationsFailed,
            donationsCompleted,
            failedPercentage,
            completedPercentage
        });
    } catch (error) {
        console.error("Error fetching donation statistics:", error);
        res.status(500).json({
            message: "Error fetching donation statistics",
            error: error.message
        });
    }
};



export const getDonationTrends=async(req,res)=>{
    try {

        const trends = await Donation.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by date in descending order
            }
        ]);
        

        res.status(200).json({
            trends
        })
        
    } catch (error) {
        console.error("Error fetching donation trends:", error);
        res.status(500).json({
            message: "Error fetching donation trends",
            error: error.message
        });
    }
}   



export const getDonationPercentageByPaymentMethod=async(req,res)=>{
    try {
        const paymentMethods=await Donation.aggregate([
            {
                $group:{_id:"$paymentMethod",totalAmount:{$sum:"$amount"}}
            },
            {
                $project:{
                    _id:1,
                    totalAmount:1,
                    percentage:{$divide:["$totalAmount",{$sum:"$totalAmount"}]}
                }
            }
        ])

        res.status(200).json({
            paymentMethods

        })
    } catch (error) {
        console.error("Error fetching donation percentage by payment method:", error);
        res.status(500).json({
            message: "Error fetching donation percentage by payment method",
            error: error.message
        });
    }
}


export const getTopCampaigns = async (req, res) => {
    try {
        const topCampaigns = await Donation.aggregate([
            {
                $group: {
                    _id: "$campaignId",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { totalAmount: -1 } // Sort by highest total amount
            },
            {
                $limit: 5 // Get only top 5 campaigns
            },
            {
                $lookup: {
                    from: "campaigns", // Match the actual collection name in MongoDB
                    localField: "_id",
                    foreignField: "_id",
                    as: "campaignDetails"
                }
            },
            {
                $unwind: "$campaignDetails" // Flatten the array
            },
            {
                $project: {
                    _id: 0,
                    campaignId: "$_id",
                    title: "$campaignDetails.title",
                    totalAmount: 1
                }
            }
        ]);

        res.status(200).json({ topCampaigns });
    } catch (error) {
        console.error("Error fetching top campaigns:", error);
        res.status(500).json({
            message: "Error fetching top campaigns",
            error: error.message
        });
    }
};


export const getAllTransactions=async(req,res)=>{
    try {
        const transactions=await Donation.find().populate("campaignId","title").populate("donorId","name")
        res.status(200).json({
            transactions
        })
        
    } catch (error) {
        console.error("Error fetching all transactions:", error);
        res.status(500).json({
            message: "Error fetching all transactions",
            error: error.message
        });
    }
}


export const getDonationById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ 
                message: "Donation ID is required." 
            });
        }

        const donation = await Donation.findById(id)
            .populate("campaignId", "image title description amount country city address zipCode")
            .populate("donorId", "profilePicture name email");

        if (!donation) {
            return res.status(404).json({ 
                message: "Donation not found." 
            });
        }
        

        res.status(200).json({ donation });
    } catch (error) {
        console.error("Error fetching donation by ID:", error);
        res.status(500).json({
            message: "Internal server error while fetching donation by ID.",
            error: error.message
        });
    }
};



