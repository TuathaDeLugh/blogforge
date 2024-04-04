import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
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
			type: [Schema.Types.ObjectId],
			ref: 'blog',
		},
	},
	{
		timestamps: true,
	}
)
const User= models.users || model("users",userSchema)

export default User