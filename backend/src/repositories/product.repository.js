import orders from "../data/orders.js";

/**
 * Sauvegarde une commande en mémoire
 * 
 * @param {Object} order - Objet commande à sauvegarder
 * @returns {Object} - Commande sauvegardée
 */
export const saveOrder = (order) => {
  orders.push(order);
  return order;
};

/**
 * Récupère toutes les commandes
 * 
 * @returns {Array} - Liste des commandes
 */
export const getAllOrders = () => {
  return orders;
};

/**
 * Recherche une commande par son ID
 * 
 * @param {String} orderId - Identifiant de la commande
 * @returns {Object|undefined} - Commande trouvée ou undefined
 */
export const findOrderById = (orderId) => {
  return orders.find(order => order.orderId === orderId);
};

/**
 * Supprime une commande par son ID
 * Utile pour les annulations
 * 
 * @param {String} orderId - Identifiant de la commande
 * @returns {Boolean} - true si supprimée, false sinon
 */
export const deleteOrder = (orderId) => {
  const index = orders.findIndex(order => order.orderId === orderId);
  
  if (index === -1) {
    return false;
  }
  
  orders.splice(index, 1);
  return true;
};