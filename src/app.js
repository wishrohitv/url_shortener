import express from "express";
import path from "path";
import { express as useragent } from 'express-useragent';
import Env from "./config/env.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.urlencoded({ extended: true }));
app.use(useragent()); // Middleware to parse user-agent information

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));
app.set("trust proxy", true); // Enable trust proxy for accurate client IP detection

import indexRoute from "./routes/web/index.route.js";

import urlRoute from "./routes/api/url.routes.js";

// frontend routes
app.use("/", indexRoute);

// backend routes
app.use("/api/url", urlRoute);

// Catch-all middleware for UNKNOWN routes (404)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Forwards the error to the global error handler
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res
    .status(404)
    .render("notFound", { url: req.originalUrl, error: err.message });
});

export default app;
