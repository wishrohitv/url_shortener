import { Links } from "../models/links.model.js";
import { uid } from "uid";

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
};
