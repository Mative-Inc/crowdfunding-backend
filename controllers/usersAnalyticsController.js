import Campaign from "../models/campaignSchema.js";
import User from "../models/userSchema.js";

export const getUserAnalytics = async (req, res) => {
    try {
        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

        // Get total users (excluding deleted)
        const totalUsers = await User.countDocuments({ deleted: false });
        console.log("totalUsers",totalUsers);

        // Get active users
        const activeUsers = await User.countDocuments({ 
            deleted: false,
            status: 'active'
        });
        console.log("activeUsers",activeUsers);

        // Calculate active users percentage
        const activeUsersPercentage = totalUsers > 0 
            ? parseFloat(((activeUsers / totalUsers) * 100).toFixed(2))
            : 0;

        // Get new signups this month
        const newSignups = await User.countDocuments({
            createdAt: { $gte: currentMonth, $lt: today },
            deleted: false
        });

        // Calculate monthly growth
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: lastMonth, $lt: currentMonth },
            deleted: false
        });
        const previousMonthUsers = await User.countDocuments({
            createdAt: { $gte: twoMonthsAgo, $lt: lastMonth },
            deleted: false
        });

        const monthlyGrowth = previousMonthUsers === 0 
            ? 100 
            : parseFloat(((lastMonthUsers - previousMonthUsers) / previousMonthUsers * 100).toFixed(2));

        // Get user status distribution
        const statusDistribution = await User.aggregate([
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
        

        // Format status distribution with percentages
        const usersByStatus = statusDistribution.reduce((acc, status) => {
            acc[status._id] = {
                count: status.count,
                percentage: parseFloat(((status.count / totalUsers) * 100).toFixed(2))
            };
            return acc;
        }, {});
       

        res.status(200).json({
            totalUsers,
            activeUsers,
            activeUsersPercentage,
            newSignups,
            monthlyGrowth,
            usersByStatus
        });

    } catch (error) {
        console.error('User Analytics Error:', error);
        res.status(500).json({ 
            message: "Error fetching user analytics",
            error: error.message 
        });
    }
};

export const getUserTrends = async (req, res) => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Get monthly user registration trends for the current year
        const yearlyTrends = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lte: new Date(currentYear, 11, 31)
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
                    count: { $sum: 1 }
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
            byStatus: {
                active: 0,
                inactive: 0,
                suspended: 0
            }
        }));

        // Fill in the actual user data
        yearlyTrends.forEach(data => {
            const monthIndex = data._id.month - 1;
            trendsData[monthIndex].total += data.count;
            trendsData[monthIndex].byStatus[data._id.status] = data.count;
        });

        // Calculate year-to-date statistics
        const currentMonth = today.getMonth();
        const ytdTrendsData = trendsData.slice(0, currentMonth + 1);
        const ytdTotalUsers = ytdTrendsData.reduce((sum, month) => sum + month.total, 0);
        const ytdActiveUsers = ytdTrendsData.reduce((sum, month) => sum + month.byStatus.active, 0);

        // Calculate growth rate
        const currentMonthData = trendsData[currentMonth];
        const previousMonthData = trendsData[currentMonth > 0 ? currentMonth - 1 : 11];
        const monthlyGrowth = previousMonthData.total === 0 
            ? 100 
            : ((currentMonthData.total - previousMonthData.total) / previousMonthData.total * 100);

        res.status(200).json({
            trends: trendsData,
            statistics: {
                yearToDate: {
                    totalUsers: ytdTotalUsers,
                    activeUsers: ytdActiveUsers,
                    activeUsersPercentage: parseFloat(((ytdActiveUsers / ytdTotalUsers) * 100).toFixed(2))
                },
                monthlyGrowth: parseFloat(monthlyGrowth.toFixed(2))
            }
        });

    } catch (error) {
        console.error('User Trends Error:', error);
        res.status(500).json({ 
            message: "Error fetching user trends",
            error: error.message 
        });
    }
}; 


export const getRoleBasedUsers = async (req, res) => {
    try {
        // Get total active users for each role
        const roleStats = await User.aggregate([
            {
                $match: { 
                    deleted: false,
                    status: 'active'
                }
            },
            {
                $group: {
                    _id: '$role',
                    activeCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    role: '$_id',
                    activeCount: 1,
                    _id: 0
                }
            }
        ]);

        // Convert role stats into an array format
        const formattedStats = [
            { role: 'admin', activeCount: 0 },
            { role: 'campaign creator', activeCount: 0 },
            { role: 'donor', activeCount: 0 }
        ];

        // Update counts where applicable
        roleStats.forEach(stat => {
            const index = formattedStats.findIndex(item => item.role === stat.role);
            if (index !== -1) {
                formattedStats[index].activeCount = stat.activeCount;
            }
        });

        res.status(200).json({ activeUsersByRole: formattedStats });

    } catch (error) {
        console.error('Error fetching role-based users:', error);
        res.status(500).json({ 
            message: 'Error fetching role-based users', 
            error: error.message 
        });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ deleted: false });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, { deleted: true }, { new: true });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}

export const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Error updating user status', error: error.message });
    }
}

