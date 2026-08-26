import { Router } from "express";
import { registerUrl, urlStats } from "../../controllers/api.url.controllers.js";

const router = Router();

router.route("/register").post(registerUrl);
router.route("/:urlId/stats").get(urlStats);
export default router;
