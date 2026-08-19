import { asyncHandler } from "../utils/asyncHandler.js";
import { UrlService } from "../services/url.service.js";

const registerUrl = asyncHandler(async function (req, res, next) {
  const { url } = req.body;

  const { urlId } = await UrlService.createShortUrl(url);

  res.status(200).json({
    message: "success",
    data: {
      shortedURL: `${req.protocol}://${req.get("host")}/${urlId}`,
    },
  });
});

export { registerUrl };
