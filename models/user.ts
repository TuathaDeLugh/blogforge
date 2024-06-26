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
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
