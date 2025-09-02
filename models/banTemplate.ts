import mongoose, { Schema } from 'mongoose';

const adminActionTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    actionType: {
      type: String,
      enum: ['account_ban', 'comment_ban', 'username_change', 'delete_account'],
      required: true,
    },
    duration: {
      type: Number, // Duration in hours, null for permanent or N/A
      default: null,
    },
    reason: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    // Additional fields for specific action types
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// Index for better performance
adminActionTemplateSchema.index({ actionType: 1, isActive: 1 });
adminActionTemplateSchema.index({ severity: 1 });

export const AdminActionTemplate =
  mongoose.models.AdminActionTemplate ||
  mongoose.model('AdminActionTemplate', adminActionTemplateSchema);

// Keep backward compatibility
export const BanTemplate = AdminActionTemplate;

export default BanTemplate;
