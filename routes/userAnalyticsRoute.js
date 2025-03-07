import { Router } from 'express';
import { deleteUser, getAllUsers, getRoleBasedUsers, getUserAnalytics, getUserTrends, updateUserStatus } from '../controllers/usersAnalyticsController.js';

const userAnalyticsRouter = Router();

userAnalyticsRouter.get('/', getUserAnalytics);
userAnalyticsRouter.get('/trends', getUserTrends);
userAnalyticsRouter.get('/roles', getRoleBasedUsers);
userAnalyticsRouter.get('/all', getAllUsers);
userAnalyticsRouter.delete('/:userId', deleteUser);
userAnalyticsRouter.put('/:userId', updateUserStatus);

export default userAnalyticsRouter;
