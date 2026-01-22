import Joi from "joi";

// Schéma pour un article du panier
const cartItemSchema = Joi.object({
  productId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "L'ID du produit doit être un nombre",
      "number.integer": "L'ID du produit doit être un entier",
      "number.positive": "L'ID du produit doit être positif",
      "any.required": "L'ID du produit est requis",
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .required()
    .messages({
      "number.base": "La quantité doit être un nombre",
      "number.integer": "La quantité doit être un entier",
      "number.min": "La quantité doit être au moins 1",
      "number.max": "La quantité ne peut pas dépasser 100",
      "any.required": "La quantité est requise",
    }),
});

// Schéma pour le panier complet
const cartSchema = Joi.array()
  .items(cartItemSchema)
  .min(1)
  .max(50)
  .required()
  .messages({
    "array.base": "Le panier doit être un tableau",
    "array.min": "Le panier doit contenir au moins 1 article",
    "array.max": "Le panier ne peut pas contenir plus de 50 articles",
    "any.required": "Le panier est requis",
  });

/**
 * Middleware de validation pour les commandes
 *  @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @param {Function} next - Fonction pour passer au middleware suivant
 */
export const validateOrderMiddleware = (req, res, next) => {
  const { cart } = req.body;

  const { error, value } = cartSchema.validate(cart, {
    abortEarly: false, //retourne toutes les erreurs
    stripUnknown: true, //Supprime automatiquement les champs non autorisés
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors,
    });
  }

  req.body.cart = value;
  next();
};