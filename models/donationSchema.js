import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    amount: { type: Number, required: true },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    companyName: { type: String },
    postalCode: { type: String },
    city: { type: String },
    houseNumber: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    paymentMethod: { type: String, default: "credit_card", enum: ["credit_card", "debit_card", "paypal", "bank_transfer"], required: true },
    transactionId: { type: String },
    transactionStatus: { type: String },
    deleted: { type: Boolean, default: false },
    
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
