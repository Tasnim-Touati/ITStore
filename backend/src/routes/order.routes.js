import express from "express";
import rateLimit from "express-rate-limit";
import {
  previewOrderController,
  createOrderController,
  getOrdersController,
  getOrderByIdController,
} from "../controllers/order.controller.js";
import { validateOrderMiddleware } from "../validators/order.validator.js";

const router = express.Router();
// limite le nombre de commandes par IP sur une période donnée
const orderLimiter = rateLimit({
  windowMs: parseInt(process.env.ORDER_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.ORDER_RATE_LIMIT_MAX_ORDERS) || 10,
  message: "Trop de commandes depuis cette IP. Réessayez dans 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/orders → Liste toutes les commandes
router.get("/", getOrdersController);

// GET /api/orders/:orderId → Détails d'une commande
router.get("/:orderId", getOrderByIdController);

// POST /api/orders/preview → Prévisualisation
router.post(
  "/preview",
  validateOrderMiddleware,
  previewOrderController
);

// POST /api/orders → Création de commande
router.post(
  "/",
  orderLimiter,
  validateOrderMiddleware,
  createOrderController
);

export default router;