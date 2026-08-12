import mongoose, { Schema } from "mongoose";

const linksSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    urlId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Links = mongoose.model("Links", linksSchema);
