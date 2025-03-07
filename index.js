import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRouter from './routes/authRoute.js';
import setupSwagger from './swagger.js';
import campaignRouter from './routes/campaignRoute.js';
import donationRouter from './routes/donationRoute.js';
import analyticsRouter from './routes/analyticsRoute.js';
import userAnalyticsRouter from './routes/userAnalyticsRoute.js';
import campaignAnalyticsRouter from './routes/campaignAnalyticsRoute.js';
import donationAnalyticsRouter from './routes/donationAnalyticsRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

// Setup Swagger 


app.use('/api/auth', authRouter);
app.use('/api/campaigns', campaignRouter);
app.use('/api/donations', donationRouter);
app.use('/api/dashboard', analyticsRouter);
app.use('/api/analytics/users', userAnalyticsRouter);
app.use('/api/analytics/campaign', campaignAnalyticsRouter);
app.use('/api/analytics/donations', donationAnalyticsRouter);
// Setup Swagger Docs
setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

