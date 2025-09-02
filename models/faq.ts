import mongoose, { Schema } from 'mongoose';

const faqSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FaQ = mongoose.models.FaQ || mongoose.model('FaQ', faqSchema);

export default FaQ;
