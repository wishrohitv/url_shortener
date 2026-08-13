import { asyncHandler } from "../utils/asyncHandler.js";
import { UrlService } from "../services/url.service.js";

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

    res.redirect(url.url);
  } catch (error) {
    res.status(404);
    next(new Error(`Short URL not found for ID: ${urlId}`));
  }
});

const aboutPage = asyncHandler(async function (req, res, next) {
  res.render("about");
});

export { indexPage, createShortUrl, redirectToOriginalUrl, aboutPage };
