import { asyncHandler } from "../../utils/asyncHandler.js";
import { UrlService } from "../../services/url.service.js";
import { uid } from "uid";

const registerUrl = asyncHandler(async function (req, res, next) {
  const { url } = req.body;

  const { urlId } = await UrlService.createShortUrl(url);

  return res.status(200).json({
    message: "success",
    payload: {
      shortedURL: `${req.protocol}://${req.get("host")}/${urlId}`,
    },
  });
});

const getAllUrl = asyncHandler(async function (req, res, next) {
  const urls = await UrlService.getAllUrls();

  return res.status(200).json({
    message: "success",
    payload: urls,
  });
});

export { registerUrl, getAllUrl };
