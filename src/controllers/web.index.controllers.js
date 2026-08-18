import { asyncHandler } from "../utils/asyncHandler.js";
import { UrlService } from "../services/url.service.js";
import AppError from "../utils/AppError.js";

const indexPage = asyncHandler(async function (req, res, next) {
  res.render("index", { originalURL: null, shortedURL: null });
});

const createShortUrl = asyncHandler(async function (req, res, next) {
  const { url } = req.body;
  const { urlId } = await UrlService.createShortUrl(url);

  res.render("index", {
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

    res.redirect(url.url);
  } catch (error) {
    console.error(error);
    res.status(404);
    next(new AppError(404, `Short URL not found for ID: ${urlId}`));
  }
});

const aboutPage = asyncHandler(async function (req, res, next) {
  res.render("about");
});

export { indexPage, createShortUrl, redirectToOriginalUrl, aboutPage };
