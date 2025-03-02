import { Router } from "express";
import { adminRoute, protectRoutes } from "../middlewares/auth.middleware.js";
import {
  createCoupon,
  getCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";

const router = Router();

router.get("/", protectRoutes, getCoupon);
router.post("/", protectRoutes, adminRoute, createCoupon);
router.post("/validate", protectRoutes, validateCoupon);

export default router;
