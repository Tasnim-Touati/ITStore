import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

/**
 * GET /api/products
 * Récupère la liste complète des produits
 */
router.get("/", getProducts);

/**
 * GET /api/products/:id
 * Récupère un produit spécifique par son ID
 */
router.get("/:id", getProductById);

export default router;