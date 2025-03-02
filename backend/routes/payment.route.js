import { Router } from "express";
import { protectRoutes } from "../middlewares/auth.middleware.js";
import {
  checkCheckoutSuccess,
  createCheckoutSession,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-checkout-session", protectRoutes, createCheckoutSession);
router.post("/checkout-success", protectRoutes, checkCheckoutSuccess);

export default router;
