import { asyncHandler } from "../utils/asyncHandler.js";
import { UrlService } from "../services/url.service.js";
import AppError from "../utils/AppError.js";

const indexPage = asyncHandler(async function (req, res, next) {
  return res.render("index", { originalURL: null, shortedURL: null });
});

const createShortUrl = asyncHandler(async function (req, res, next) {
  const { url } = req.body;
  const { urlId } = await UrlService.createShortUrl(url);

  return res.render("index", {
    originalURL: url,
    shortedURL: `${req.protocol}://${req.get("host")}/${urlId}`,
  });
});

const redirectToOriginalUrl = asyncHandler(async function (req, res, next) {
  const { urlId } = req.params;
  try {
    const url = await UrlService.getOriginalUrl(urlId);

    const ipAddress = req.ip;

    // Run the tracking function asynchronously without blocking the redirect
    UrlService.trackUrl({ urlId, ipAddress, parserUserAgent: req.useragent });

    return res.redirect(url.url);
  } catch (error) {
    const err = new AppError(404, `Short URL not found for ID: ${urlId}`);
    return next(err);
  }
});

const aboutPage = asyncHandler(async function (req, res, next) {
  return res.render("about");
});

const docsPage = asyncHandler(async function (req, res, next) {
  return res.render("docs");
});

const getUrlStats = asyncHandler(async function (req, res, next) {
  const { urlId } = req.params;
  try {
    // const stats = await UrlService.getUrlStats(urlId);
    return res.render("stats");
  } catch (error) {
    const err = new AppError(404, `Short URL not found for ID: ${urlId}`);
    return next(err);
  }
});

export {
  indexPage,
  createShortUrl,
  redirectToOriginalUrl,
  aboutPage,
  docsPage,
  getUrlStats,
};
