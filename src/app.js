import express from "express";
import path from "path";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

import indexRoute from "./routes/web/index.route.js";

import urlRoute from "./routes/api/url.routes.js";

// frontend routes
app.use("/", indexRoute);

// backend routes
app.use("/api/url", urlRoute);

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

export default app;
