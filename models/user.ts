import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IUser extends Document {
    username: string;
    name?: string;
    avatar?: string;
    email: string;
    password?: string;
    provider?: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    savelist: Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
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

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
