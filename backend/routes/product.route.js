import { Router } from "express";
import {
  getallproducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getCategoryProducts,
  toggleFeatureProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoutes } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protectRoutes, adminRoute, getallproducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/:id", getProductById);
router.patch("/:id", protectRoutes, adminRoute, updateProduct);
router.get("/category/:category", getCategoryProducts);
router.post("/", protectRoutes, adminRoute, createProduct);
router.put("/:id", protectRoutes, adminRoute, toggleFeatureProduct);
router.delete("/:id", protectRoutes, adminRoute, deleteProduct);

export default router;
