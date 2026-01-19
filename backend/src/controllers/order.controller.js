import {
  calculateOrderPreview,
  createOrder,
} from "../services/order.service.js";

/**
 * Prévisualise une commande (calcule le total sans modifier le stock)
 */
export const previewOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    // Double vérification même si le validator middleware a déjà validé
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        message: "Le panier est vide ou invalide" 
      });
    }

    const orderPreview = calculateOrderPreview(cart);
    
    res.status(200).json({
      success: true,
      data: orderPreview,
    });
  } catch (err) {
    console.error("❌ Error in previewOrderController:", err);

    // Stock insuffisant (409 Conflict)
    if (err.stockIssues) {
      return res.status(409).json({
        success: false,
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }

    // Fallback pour autres erreurs métier
    res.status(400).json({
      success: false,
      message: err.message || "Erreur lors de la prévisualisation de la commande",
    });
  }
};

/**
 * Crée une commande (valide et diminue le stock)
 */
export const createOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Le panier est vide ou invalide" 
      });
    }

    const order = createOrder(cart);
    
    res.status(201).json({
      success: true,
      message: "Commande créée avec succès",
      data: order,
    });
  } catch (err) {
    console.error("❌ Error in createOrderController:", err);

    // Stock insuffisant - renvoyer détails pour affichage côté client
    if (err.stockIssues) {
      return res.status(409).json({
        success: false,
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }

    // Produit inexistant dans le catalogue
    if (err.message.includes("introuvable")) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    // Catch-all pour erreurs imprévues
    res.status(400).json({
      success: false,
      message: err.message || "Erreur lors de la création de la commande",
    });
  }
};