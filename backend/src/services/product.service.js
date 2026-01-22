import { 
  findAllProducts, 
  findProductById 
} from "../repositories/product.repository.js";

/**
 * Récupère tous les produits du catalogue
 * 
 * @returns {Array} - Liste complète des produits
 */
export const getAllProducts = () => {
  return findAllProducts();
};

/**
 * Récupère un produit par son identifiant
 * Gère les ID en string ou number pour flexibilité
 * 
 * @param {Number|String} id - Identifiant du produit
 * @returns {Object|undefined} - Produit trouvé ou undefined
 */
export const getProductById = (id) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return findProductById(numericId);
};