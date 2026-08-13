import { Router } from "express";
import {
  indexPage,
  createShortUrl,
  redirectToOriginalUrl,
  aboutPage
} from "../../controllers/web.index.controllers.js";
const router = Router();

router.route("/").get(indexPage).post(createShortUrl);

router.route("/about").get(aboutPage);

// Redirect to original URL based on the short URL
router.route("/:urlId").get(redirectToOriginalUrl);

export default router;
