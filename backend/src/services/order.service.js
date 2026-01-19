import products from "../data/products.js";

/**
 * Calcule un aperçu de la commande sans modifier le stock
 * Utilisé pour afficher le récapitulatif avant confirmation
 */
export const calculateOrderPreview = (cart) => {
  let total = 0;
  const stockIssues = [];

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

    // Collecte les problèmes de stock sans bloquer immédiatement
    if (product.stock < item.quantity) {
      stockIssues.push({
        productId: product.id,
        productName: product.name,
        requested: item.quantity,
        available: product.stock,
      });
    }

    const subTotal = product.price * item.quantity;
    total += subTotal;

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subTotal,
    };
  });

  // Lève une erreur si au moins un produit a un stock insuffisant
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues; // Attach détails pour le client
    throw error;
  }

  return { items, total };
};

/**
 * Crée la commande et met à jour le stock
 * IMPORTANT: Modifie les données - valide tout avant de modifier
 */
export const createOrder = (cart) => {
  let total = 0;
  const items = [];
  const stockIssues = [];

  // Phase 1: Validation complète AVANT toute modification
  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produit ${item.productId} introuvable`);
    }

    if (product.stock < item.quantity) {
      stockIssues.push({
        productId: product.id,
        productName: product.name,
        requested: item.quantity,
        available: product.stock,
      });
    }

    const subTotal = product.price * item.quantity;
    total += subTotal;

    items.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      subTotal,
    });
  }

  // Bloque la commande si stock insuffisant
  if (stockIssues.length > 0) {
    const error = new Error("Stock insuffisant pour certains produits");
    error.stockIssues = stockIssues;
    throw error;
  }

  // Phase 2: Mise à jour du stock (après validation réussie)
  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);
    product.stock -= item.quantity;
  }

  // Phase 3: Génération de la confirmation
  const order = {
    orderId: `ORD-${Date.now()}`, // Format: ORD-1705420800000
    items,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return order;
};