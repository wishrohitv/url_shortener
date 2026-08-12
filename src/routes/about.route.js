import {Router} from "express";
const aboutRoute = Router();

aboutRoute.route("/").get((req, res) => {
  res.render("about");
});

export default aboutRoute;