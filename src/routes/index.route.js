import { Router } from "express";
import { UrlService } from "../services/url.service.js";
const indexRoute = Router();

indexRoute
  .route("/")
  .get((req, res) => {
    res.render("index", { originalURL: null, shortedURL: null });
  })
  .post(async (req, res) => {
    const { url } = req.body;
    const { urlId } = await UrlService.createShortUrl(url);

    res.render("index", {
      originalURL: url,
      shortedURL: `${req.protocol}://${req.get("host")}/${urlId}`,
    });
  });

// Redirect to original URL based on the short URL
indexRoute.route("/:urlId").get(async (req, res) => {
  const { urlId } = req.params;
  try {
    const url = await UrlService.getOriginalUrl(urlId);
    if (!url) {
      return res.status(404).render("notFound");
    }
    res.redirect(url.url);
  } catch (error) {
    res.status(500).render("notFound");
  }
});

export default indexRoute;
