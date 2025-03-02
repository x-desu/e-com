import { Router } from "express";
import { adminRoute, protectRoutes } from "../middlewares/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", protectRoutes, adminRoute, async (req, res, next) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endData = new Date();
    const startData = new Date(endData.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySalesData = await getDailySalesData(startData, endData);
    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Error in analytics route", error.message || error);
    next(error);
  }
});

export default router;
