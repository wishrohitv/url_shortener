import { Links } from "../models/links.model.js";
import { Analytics } from "../models/analytics.model.js";
import { uid } from "uid";
import { readFileSync } from "fs";
import path from "path";
import { Reader } from "@maxmind/geoip2-node";

export const UrlService = {
  async createShortUrl(url) {
    let _uid = uid(6);

    const existingUrl = await Links.findOne({ url });
    if (existingUrl) {
      return { urlId: existingUrl.urlId };
    }

    while (true) {
      const checkExistingUrlId = await Links.findOne({ urlId: _uid });

      if (!checkExistingUrlId) {
        break;
      }

      _uid = uid(6);
    }

    const newLink = await Links.create({
      url,
      urlId: _uid,
    });
    await newLink.save();

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

    console.log(parserUserAgent);

    const dbBuffer = readFileSync(
      path.join(path.resolve(), "src/public/ip66.mmdb"),
    );
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
