import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    email: { type: String, required: true, unique: true },
    password: String,
    provider: String,
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    savelist: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    deleteAccountToken: { type: String, required: false },
    deleteAccountTokenExpiry: { type: Date, required: false },
    newMail: { type: String, required: false },
    NewMailToken: { type: String, required: false },
    NewMailTokenExpiry: { type: Date, required: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorToken: { type: String, required: false },
    twoFactorTokenExpiry: { type: Date, required: false },
    pendingTwoFactorEmail: { type: String, required: false },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
