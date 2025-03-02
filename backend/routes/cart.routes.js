import { Router } from "express";
import {
  addToCart,
  getCartItems,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { protectRoutes } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/", protectRoutes, getCartItems);
router.post("/", protectRoutes, addToCart);
router.delete("/", protectRoutes, removeAllFromCart);
router.put("/:id", protectRoutes, updateQuantity);

export default router;
