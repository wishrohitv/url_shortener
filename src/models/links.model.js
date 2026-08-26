import mongoose, { Schema } from "mongoose";
import { Counter } from "./counter.model.js";
import { Base62 } from "../utils/base62.js";

const linksSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    urlId: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

linksSchema.pre("save", async function () {
  if (this.isNew) {
    const seq = await Counter.findOneAndUpdate(
      { _id: "urlId" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    const _uid = Base62.encode(seq.seq);
    this.urlId = _uid;
  }
});

export const Links = mongoose.model("Links", linksSchema);
