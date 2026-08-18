import { Links } from "../models/links.model.js";
import { Analytics } from "../models/analytics.model.js";
import { Counter } from "../models/counter.model.js";
import { Base62 } from "../utils/base62.js";
import { mmdbBuffer } from "../db/index.js";
import path from "path";
import { Reader } from "@maxmind/geoip2-node";

export const UrlService = {
  async createShortUrl(url) {
    const seq = await Counter.findOneAndUpdate(
      { _id: "urlId" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    const _uid = Base62.encode(seq.seq);

    const newLink = await Links.create({
      url,
      urlId: _uid,
    });

    return { urlId: _uid };
  },

  async getOriginalUrl(urlId) {
    const url = await Links.findOne({ urlId });
    if (!url) {
      throw new Error("URL not found");
    }
    return url;
  },

  async trackUrl({ urlId, ipAddress, parserUserAgent }) {
    const url = await Links.findOne({ urlId });
    if (!url) {
      throw new Error("URL not found");
    }

    const dbBuffer = mmdbBuffer();
    const reader = Reader.openBuffer(dbBuffer);

    let geoData;
    try {
      geoData = reader.country(ipAddress);
    } catch (error) {
      geoData = null;
    }

    const analytics = await Analytics.create({
      linkId: url._id,
      ipAddress,
      userAgent: parserUserAgent.source,
      os: parserUserAgent.platform,
      browser: parserUserAgent.browser,
      country: geoData ? geoData.country.names.en : "Unknown",
    });

    await url.save();
  },
};
