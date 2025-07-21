import mongoose, { Schema } from "mongoose";

const banTemplateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    banType: { 
        type: String, 
        enum: ['account', 'comment'], 
        required: true 
    },
    duration: { 
        type: Number, // Duration in hours, null for permanent
        default: null 
    },
    reason: { 
        type: String, 
        required: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    severity: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'critical'], 
        default: 'medium' 
    },
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    usageCount: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

// Index for better performance
banTemplateSchema.index({ banType: 1, isActive: 1 });
banTemplateSchema.index({ severity: 1 });

export const BanTemplate = mongoose.models.BanTemplate || mongoose.model("BanTemplate", banTemplateSchema);

export default BanTemplate;