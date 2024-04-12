import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		name: String,
		avatar: String,
		email: { type: String, required: true, unique: true },
		password: String,
		provider: String,
		isVerified:{
			type:Boolean,
			default:false,
		},
		isAdmin:{
			type:Boolean,
			default:false,
		},
		forgotPasswordToken: String,
		forgotPasswordExpiry:  Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
		watchlist: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'blog',
		},
	},
	{
		timestamps: true,
	}
)
const User= mongoose.models.users || mongoose.model("users",userSchema)

export default User