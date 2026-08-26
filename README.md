# URL Shortener

A simple URL shortener built with Express, EJS, and MongoDB.

## Overview

This project provides a minimal full-stack web app that accepts a long URL, generates a shortened link, and redirects requests to the original URL.

## Architecture

- **Express.js** handles routing, middleware, and static asset delivery.
- **EJS** renders server-side views and includes shared partials for layout consistency.
- **MongoDB** stores URL mappings with a lightweight Mongoose model.
- **Tailwind CSS** is loaded via CDN for responsive styling.
- **Static assets** are served from `src/public`, including the favicon.

## Routes

### Page routes

- `GET /` - Home page with the URL shortening form.
- `POST /` - Handles form submission and returns the shortened link.
- `GET /:urlId` - Redirects to the original URL based on the short URL.
- `GET /about` - Project information and architecture page.
- `GET /docs` - API documentation page.
- `GET /*` - Fallback route for not found pages (renders `notFound.ejs`).

### API routes

- `POST /api/url/register` - Create a new shortened link. Send `{ "url": "https://example.com" }` as JSON.
- `GET /api/url/:urlId/stats` - Read click analytics. Use `?type=line`, `?type=os`, or `?type=country`.

## Pages

- `src/views/index.ejs` - Main application page with the URL form and result cards.
- `src/views/about.ejs` - About page with architecture overview and GitHub repository link.
- `src/views/docs.ejs` - API endpoint reference and request examples.
- `src/views/notFound.ejs` - Styled 404 page for invalid routes.
- `src/views/partials/header.ejs` - Shared header/navigation partial.

## Database

- Model file: `src/models/links.model.js`
- The database stores at least:
  - original/full URL
  - shortened code or slug
  - created timestamp


## Getting started

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Then open `http://localhost:8000` in your browser.
