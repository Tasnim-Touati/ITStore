import express from "express";
import rateLimit from "express-rate-limit";
import {
  previewOrderController,
  createOrderController,
} from "../controllers/order.controller.js";
import { validateOrderMiddleware } from "../validators/order.validator.js";

const router = express.Router();

// Rate limiter spécifique aux commandes - plus strict que le limiter global
// Protège contre les abus de création de commandes
const orderLimiter = rateLimit({
  windowMs: parseInt(process.env.ORDER_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: parseInt(process.env.ORDER_RATE_LIMIT_MAX_ORDERS) || 10, // 10 commandes max
  message: "Trop de commandes depuis cette IP. Veuillez réessayer dans 15 minutes.",
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,  // Disable X-RateLimit-* headers
});

/**
 * POST /api/orders/preview
 * Prévisualise une commande sans modifier le stock
 * Pas de rate limit - utilisé pour afficher le récapitulatif
 */
router.post(
  "/preview",
  validateOrderMiddleware,
  previewOrderController
);

/**
 * POST /api/orders
 * Crée une nouvelle commande et met à jour le stock
 * Rate limited - action critique qui modifie les données
 */
router.post(
  "/",
  orderLimiter, // Appliqué en premier pour bloquer avant validation si limite atteinte
  validateOrderMiddleware,
  createOrderController
);

export default router;