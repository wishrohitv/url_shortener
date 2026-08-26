import { asyncHandler } from "../utils/asyncHandler.js";
import { UrlService } from "../services/url.service.js";
import { AnalyticsService } from "../services/analytics.service.js";

const registerUrl = asyncHandler(async function (req, res, next) {
  const { url } = req.body;

  const { urlId } = await UrlService.createShortUrl(url);

  return res.status(200).json({
    message: "success",
    data: {
      shortedURL: `${req.protocol}://${req.get("host")}/${urlId}`,
    },
  });
});

const urlStats = asyncHandler(async function (req, res, next) {
  const { urlId } = req.params;
  const { type = "line", from = "30days" } = req.query;
  
  let stats;
  if (type === "os") {
    stats = await AnalyticsService.getUrlOsStats(urlId);
  } else if (type === "country") {
    stats = await AnalyticsService.getUrlCountryStats(urlId);
  } else {
    // Default line
    stats = await AnalyticsService.getUrlClickStats(urlId);
  }

  return res.status(200).json({
    message: "success",
    data: stats,
    type: type,
  });
});

export { registerUrl, urlStats };
