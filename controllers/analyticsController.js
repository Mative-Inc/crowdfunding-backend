import Campaign from "../models/campaignSchema.js";
import User from "../models/userSchema.js";
import Donation from "../models/donationSchema.js";

export const getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

        // Get campaign stats
        const totalCampaigns = await Campaign.countDocuments({ deleted: false });
        const lastMonthCampaigns = await Campaign.countDocuments({
            createdAt: { $gte: lastMonth, $lt: today },
            deleted: false
        });
        const previousMonthCampaigns = await Campaign.countDocuments({
            createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
            deleted: false
        });
        const campaignGrowth = previousMonthCampaigns === 0 
            ? 100 
            : ((lastMonthCampaigns - previousMonthCampaigns) / previousMonthCampaigns) * 100;

        // Get campaign status distribution
        const completedCampaigns = await Campaign.countDocuments({ 
            status: 'completed',
            deleted: false 
        });
        const completionRate = (completedCampaigns / totalCampaigns) * 100;

        // Get campaign status counts
        const campaignStatusCounts = await Campaign.aggregate([
            {
                $match: { deleted: false }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const statusDistribution = {};
        campaignStatusCounts.forEach(status => {
            statusDistribution[status._id] = {
                count: status.count,
                percentage: parseFloat(((status.count / totalCampaigns) * 100).toFixed(2))
            };
        });

        // Get user stats
        const totalUsers = await User.countDocuments();
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: lastMonth, $lt: today }
        });
        const previousMonthUsers = await User.countDocuments({
            createdAt: { $gte: twoMonthsAgo, $lt: lastMonth }
        });
        const userGrowth = previousMonthUsers === 0 
            ? 100 
            : ((lastMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;

        // Get donation stats
        const donations = await Donation.find();
        const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
        
        const lastMonthDonations = await Donation.find({
            date: { $gte: lastMonth, $lt: today },
            status: 'completed'
        });
        const lastMonthTotal = lastMonthDonations.reduce((sum, donation) => sum + donation.amount, 0);
        
        const previousMonthDonations = await Donation.find({
            date: { $gte: twoMonthsAgo, $lt: lastMonth },
            status: 'completed'
        });
        const previousMonthTotal = previousMonthDonations.reduce((sum, donation) => sum + donation.amount, 0);
        
        const donationGrowth = previousMonthTotal === 0 
            ? 100 
            : ((lastMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

        // Calculate campaign success rate
        const completedCampaignsWithGoals = await Campaign.find({ 
            status: 'completed',
            deleted: false 
        });

        let successRate = 0;
        if (completedCampaignsWithGoals.length > 0) {
            const campaignSuccesses = await Promise.all(completedCampaignsWithGoals.map(async (campaign) => {
                const campaignDonations = await Donation.find({ 
                    campaignId: campaign._id,
                    status: 'completed'
                });
                const totalRaised = campaignDonations.reduce((sum, donation) => sum + donation.amount, 0);
                return totalRaised >= campaign.amount;
            }));

            const successfulCampaigns = campaignSuccesses.filter(success => success).length;
            successRate = (successfulCampaigns / completedCampaignsWithGoals.length) * 100;
        }

        res.status(200).json({
            totalCampaigns,
            campaignGrowth: parseFloat(campaignGrowth.toFixed(2)),
            campaignStats: {
                completionRate: parseFloat(completionRate.toFixed(2)),
                statusDistribution,
                successRate: parseFloat(successRate.toFixed(2))
            },
            totalUsers,
            userGrowth: parseFloat(userGrowth.toFixed(2)),
            totalDonations: parseFloat(totalDonations.toFixed(2)),
            donationGrowth: parseFloat(donationGrowth.toFixed(2))
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ 
            message: "Error fetching dashboard statistics",
            error: error.message 
        });
    }
}; 


export const getDonationTrends = async (req, res) => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Get all donations for the current year
        const yearlyDonations = await Donation.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(currentYear, 0, 1), // Start of year (January 1st)
                        $lte: new Date(currentYear, 11, 31) // End of year (December 31st)
                    },
                    // status: 'completed'
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" }
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { 
                    "_id.month": 1
                }
            }
        ]);

        // Transform the data into a more readable format
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Initialize all months with zero
        const trendsData = months.map(month => ({
            month,
            amount: 0,
            count: 0
        }));

        // Fill in the actual donation data
        yearlyDonations.forEach(data => {
            const monthIndex = data._id.month - 1;
            trendsData[monthIndex] = {
                month: months[monthIndex],
                amount: parseFloat(data.totalAmount.toFixed(2)),
                count: data.count
            };
        });

        // Calculate growth rates
        const currentMonth = today.getMonth();
        const currentMonthData = trendsData[currentMonth];
        const previousMonthData = trendsData[currentMonth > 0 ? currentMonth - 1 : 11];
        const monthlyGrowth = previousMonthData.amount === 0 
            ? 100 
            : ((currentMonthData.amount - previousMonthData.amount) / previousMonthData.amount) * 100;

        // Calculate totals and averages
        const totalDonations = trendsData.reduce((sum, month) => sum + month.amount, 0);
        const totalCount = trendsData.reduce((sum, month) => sum + month.count, 0);
        const averageDonation = totalCount === 0 ? 0 : totalDonations / totalCount;

        // Get year-to-date statistics
        const ytdTrendsData = trendsData.slice(0, currentMonth + 1);
        const ytdTotalDonations = ytdTrendsData.reduce((sum, month) => sum + month.amount, 0);
        const ytdTotalCount = ytdTrendsData.reduce((sum, month) => sum + month.count, 0);
        const ytdAverageDonation = ytdTotalCount === 0 ? 0 : ytdTotalDonations / ytdTotalCount;

        res.status(200).json({
            trends: trendsData,
            statistics: {
                totalAmount: parseFloat(totalDonations.toFixed(2)),
                totalCount: totalCount,
                averageDonation: parseFloat(averageDonation.toFixed(2)),
                monthlyGrowth: parseFloat(monthlyGrowth.toFixed(2)),
                yearToDate: {
                    totalAmount: parseFloat(ytdTotalDonations.toFixed(2)),
                    totalCount: ytdTotalCount,
                    averageDonation: parseFloat(ytdAverageDonation.toFixed(2))
                }
            }
        });

    } catch (error) {
        console.error('Donation Trends Error:', error);
        res.status(500).json({ 
            message: "Error fetching donation trends",
            error: error.message 
        });
    }
};


export const getCampaignTrends = async (req, res) => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();

        // Get all campaigns for the current year
        const yearlyCampaigns = await Campaign.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1), // Start of year (January 1st)
                        $lte: new Date(currentYear, 11, 31) // End of year (December 31st)
                    },
                    deleted: false
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        status: "$status"
                    },
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { 
                    "_id.month": 1,
                    "_id.status": 1
                }
            }
        ]);

        // Transform the data into a more readable format
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Initialize all months with zero
        const trendsData = months.map(month => ({
            month,
            total: 0,
            amount: 0,
            byStatus: {
                pending: 0,
                active: 0,
                completed: 0,
                cancelled: 0,
                inactive: 0
            }
        }));

        // Fill in the actual campaign data
        yearlyCampaigns.forEach(data => {
            const monthIndex = data._id.month - 1;
            trendsData[monthIndex].total += data.count;
            trendsData[monthIndex].amount += data.totalAmount;
            trendsData[monthIndex].byStatus[data._id.status] = data.count;
        });

        // Calculate growth rates
        const currentMonth = today.getMonth();
        const currentMonthData = trendsData[currentMonth];
        const previousMonthData = trendsData[currentMonth > 0 ? currentMonth - 1 : 11];
        const monthlyGrowth = previousMonthData.total === 0 
            ? 100 
            : ((currentMonthData.total - previousMonthData.total) / previousMonthData.total) * 100;

        // Calculate totals and success rates
        const totalCampaigns = trendsData.reduce((sum, month) => sum + month.total, 0);
        const totalAmount = trendsData.reduce((sum, month) => sum + month.amount, 0);
        const totalCompleted = trendsData.reduce((sum, month) => sum + month.byStatus.completed, 0);
        const successRate = totalCampaigns === 0 ? 0 : (totalCompleted / totalCampaigns) * 100;

        // Get year-to-date statistics
        const ytdTrendsData = trendsData.slice(0, currentMonth + 1);
        const ytdTotalCampaigns = ytdTrendsData.reduce((sum, month) => sum + month.total, 0);
        const ytdTotalAmount = ytdTrendsData.reduce((sum, month) => sum + month.amount, 0);
        const ytdCompleted = ytdTrendsData.reduce((sum, month) => sum + month.byStatus.completed, 0);
        const ytdSuccessRate = ytdTotalCampaigns === 0 ? 0 : (ytdCompleted / ytdTotalCampaigns) * 100;

        // Calculate status distribution
        const statusTotals = {
            pending: trendsData.reduce((sum, month) => sum + month.byStatus.pending, 0),
            active: trendsData.reduce((sum, month) => sum + month.byStatus.active, 0),
            completed: trendsData.reduce((sum, month) => sum + month.byStatus.completed, 0),
            cancelled: trendsData.reduce((sum, month) => sum + month.byStatus.cancelled, 0),
            inactive: trendsData.reduce((sum, month) => sum + month.byStatus.inactive, 0)
        };

        res.status(200).json({
            trends: trendsData,
            statistics: {
                totalCampaigns: totalCampaigns,
                totalAmount: parseFloat(totalAmount.toFixed(2)),
                successRate: parseFloat(successRate.toFixed(2)),
                monthlyGrowth: parseFloat(monthlyGrowth.toFixed(2)),
                statusDistribution: Object.entries(statusTotals).reduce((acc, [status, count]) => {
                    acc[status] = {
                        count,
                        percentage: parseFloat(((count / totalCampaigns) * 100).toFixed(2))
                    };
                    return acc;
                }, {}),
                yearToDate: {
                    totalCampaigns: ytdTotalCampaigns,
                    totalAmount: parseFloat(ytdTotalAmount.toFixed(2)),
                    successRate: parseFloat(ytdSuccessRate.toFixed(2))
                }
            }
        });

    } catch (error) {
        console.error('Campaign Trends Error:', error);
        res.status(500).json({ 
            message: "Error fetching campaign trends",
            error: error.message 
        });
    }
};

export const getRecentActivity = async (req, res) => {
    try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

        // Get the latest created campaign and its creator
        const latestCampaign = await Campaign.findOne({
            createdAt: { $gte: thirtyDaysAgo },
            deleted: false
        })
        .populate('userId', 'name')
        .sort({ createdAt: -1 });

        // Get the latest large donation and its associated campaign
        const latestLargeDonation = await Donation.findOne({
            date: { $gte: thirtyDaysAgo },
            // status: 'completed',
            amount: { $gte: 1000 }
        })
        .populate('campaignId', 'title')
        .sort({ date: -1 });


        // Get the latest completed campaign
        const  latestCompletedCampaign=await Campaign.findOne({
            status: 'completed',
            deleted: false,
            
        })
        .populate('userId', 'name')
        .sort({ updatedAt: -1 });
        // console.log(campaign);

    

        // Format activities
        const activities = [];

        if (latestCampaign) {
            activities.push({
                type: 'New Campaign Created',
                title: latestCampaign.title,
                details: `by ${latestCampaign.userId.name}`,
                timestamp: latestCampaign.createdAt
            });
        }

        if (latestLargeDonation) {
            activities.push({
                type: 'Large Donation Received',
                title: `$${latestLargeDonation.amount.toLocaleString()} - ${latestLargeDonation.campaignId.title}`,
                details: '',
                timestamp: latestLargeDonation.date
            });
        }

        if (latestCompletedCampaign) {
            activities.push({
                type: 'Campaign Goal Reached',
                title: latestCompletedCampaign.title,
                details: `$${latestCompletedCampaign.amount.toLocaleString()}`,
                timestamp: latestCompletedCampaign.updatedAt
            });
        }

        // Sort activities by timestamp (newest first)
        activities.sort((a, b) => b.timestamp - a.timestamp);

        
        

        res.status(200).json({
            activities
        });

    } catch (error) {
        console.error('Recent Activity Error:', error);
        res.status(500).json({ 
            message: "Error fetching recent activities",
            error: error.message 
        });
    }
};

