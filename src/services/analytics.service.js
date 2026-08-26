import { Analytics } from "../models/analytics.model.js";

const AnalyticsService = {
  async getUrlClickStats(urlId) {
    const analyticsData = await Analytics.aggregate([
      // 1. Join with filtering done directly inside the lookup
      {
        $lookup: {
          from: "links",
          let: { linkId: "$linkId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$linkId"] },
                    { $eq: ["$urlId", urlId] },
                  ],
                },
              },
            },
          ],
          as: "matchedLinks",
        },
      },
      // 2. Filter out analytics docs that didn't match the link condition
      {
        $match: {
          "matchedLinks.0": { $exists: true },
        },
      },
      // 3. Group by date (truncated to day level) and fix spelling
      {
        $group: {
          _id: {
            createdAt: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          visitCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          x: "$_id.createdAt",
          y: "$visitCount",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    return analyticsData;
  },

  async getUrlOsStats(urlId) {
    const analyticsData = await Analytics.aggregate([
      // 1. Join with filtering done directly inside the lookup
      {
        $lookup: {
          from: "links",
          let: { linkId: "$linkId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$linkId"] },
                    { $eq: ["$urlId", urlId] },
                  ],
                },
              },
            },
          ],
          as: "matchedLinks",
        },
      },
      // 2. Filter out analytics docs that didn't match the link condition
      {
        $match: {
          "matchedLinks.0": { $exists: true },
        },
      },
      // 3. Group by date (truncated to day level) and fix spelling
      {
        $group: {
          _id: "$os",
          visitCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          os: "$_id",
          count: "$visitCount",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    return analyticsData;
  },
  async getUrlCountryStats(urlId) {
    const analyticsData = await Analytics.aggregate([
      // 1. Join with filtering done directly inside the lookup
      {
        $lookup: {
          from: "links",
          let: { linkId: "$linkId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$linkId"] },
                    { $eq: ["$urlId", urlId] },
                  ],
                },
              },
            },
          ],
          as: "matchedLinks",
        },
      },
      // 2. Filter out analytics docs that didn't match the link condition
      {
        $match: {
          "matchedLinks.0": { $exists: true },
        },
      },
      // 3. Group by date (truncated to day level) and fix spelling
      {
        $group: {
          _id: "$country",
          visitCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          count: "$visitCount",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    return analyticsData;
  },
};

export { AnalyticsService };
