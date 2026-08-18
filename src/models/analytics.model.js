import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    linkId: {
      type: Schema.Types.ObjectId,
      ref: "Links",
      required: true,
    },
    ipAddress: {
      type: String,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    country: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Analytics = mongoose.model("Analytics", analyticsSchema);
