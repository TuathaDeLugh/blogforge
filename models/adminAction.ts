import mongoose, { Schema } from 'mongoose';

const adminActionSchema = new mongoose.Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: {
      type: String,
      enum: [
        'blog_edit',
        'comment_remove',
        'user_ban',
        'user_unban',
        'username_change',
        'account_deactivate',
      ],
      required: true,
    },
    targetType: {
      type: String,
      enum: ['user', 'blog', 'comment'],
      required: true,
    },
    targetId: { type: String, required: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    originalContent: String,
    newContent: String,
    reason: String,
    notificationSent: { type: Boolean, default: false },
    metadata: {
      blogTitle: String,
      originalUsername: String,
      newUsername: String,
      banDuration: String,
      commentContent: String,
    },
  },
  { timestamps: true }
);

export const AdminAction =
  mongoose.models.AdminAction ||
  mongoose.model('AdminAction', adminActionSchema);

export default AdminAction;
