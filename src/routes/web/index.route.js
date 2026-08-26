import { Router } from "express";
import {
  indexPage,
  createShortUrl,
  redirectToOriginalUrl,
  aboutPage,
  docsPage,
  getUrlStats,
} from "../../controllers/web.index.controllers.js";
const router = Router();

router.route("/").get(indexPage).post(createShortUrl);

router.route("/about").get(aboutPage);

router.route("/docs").get(docsPage);

router.route("/stats").get(getUrlStats);

// Redirect to original URL based on the short URL
router.route("/:urlId").get(redirectToOriginalUrl);

export default router;
