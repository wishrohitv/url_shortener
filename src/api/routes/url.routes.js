import { Router } from "express";
import { registerUrl, getAllUrl } from "../controllers/url.controllers.js";

const urlRoute = Router();

urlRoute.route("/register-url").post(registerUrl);
urlRoute.route("/get-all").get(getAllUrl)

export default urlRoute;
