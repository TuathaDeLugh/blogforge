import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		name: String,
		avatar: String,
		email: { type: String, required: true, unique: true },
		password: String,
		provider: String,
		role: String,
		watchlist: {
			type: [Schema.Types.ObjectId],
			ref: 'review',
		},
	},
	{
		timestamps: true,
	}
)
export default models.User || model('User', userSchema)