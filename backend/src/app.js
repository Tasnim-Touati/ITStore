import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";

import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

// ============================================================================
// MIDDLEWARES DE SÉCURITÉ
// ============================================================================

// 1. Helmet - Protège contre les vulnérabilités web courantes
//    (XSS, clickjacking, MIME sniffing, etc.)
app.use(helmet());

// 2. CORS - Autorise uniquement le frontend configuré
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Permet l'envoi de cookies
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ============================================================================
// MIDDLEWARES DE PARSING
// ============================================================================

// 3. Body parser avec limite pour éviter les attaques DoS
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ============================================================================
// LOGGING
// ============================================================================

// 4. Morgan - Logs détaillés en dev, format standard en prod
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Format coloré et concis
} else {
  app.use(morgan("combined")); // Format Apache standard
}

// ============================================================================
// RATE LIMITING
// ============================================================================

// 5. Rate limiter global - Protection contre les abus
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 req/window
  message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false,  // Désactive X-RateLimit-* headers
});
app.use(globalLimiter);

// ============================================================================
// ROUTES
// ============================================================================

// 6. Health check - Utilisé pour monitoring/load balancers
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// 7. API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ============================================================================
// GESTION DES ERREURS
// ============================================================================

// 8. Catch-all pour routes non définies
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// 9. Error handler global - Centralise la gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  // Masque les détails en production pour la sécurité
  const message = process.env.NODE_ENV === "production" 
    ? "Une erreur interne est survenue" 
    : err.message;

  res.status(err.status || 500).json({
    message,
    // Stack trace uniquement en dev pour faciliter le debug
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;