import { Router } from "express";
import { registerUrl } from "../../controllers/api.url.controllers.js";

const router = Router();

router.route("/register").post(registerUrl);

export default router;
