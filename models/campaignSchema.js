import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    goal: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    video: { type: String, required: true },
    media: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'inactive', 'completed', 'cancelled'] },
    deleted: { type: Boolean, default: false },
    donorCommunication: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
