import express from "express";
import path from "path";

const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

import indexRoute from "./routes/index.route.js";
import aboutRoute from "./routes/about.route.js";

import urlRoute from "./api/routes/url.routes.js";

// frontend routes
app.use("/about", aboutRoute);
app.use("/", indexRoute);

// backend routes
app.use("/api/v1", urlRoute);


export default app;
