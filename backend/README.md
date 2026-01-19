# 🛒 ITStore Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.2+-blue.svg)](https://expressjs.com/)
[![Security](https://img.shields.io/badge/Security-Hardened-success.svg)](https://github.com)

Backend RESTful API pour une application e-commerce moderne avec gestion de produits et de commandes.

**Base URL**: `http://localhost:3001/api`

---

## ✨ Fonctionnalités

- ✅ Catalogue de produits avec gestion du stock
- ✅ Système de commandes avec validation
- ✅ Prévisualisation de commande (sans impact stock)
- ✅ Validation stricte des données (Joi)
- ✅ Sécurité renforcée (Helmet, CORS, Rate Limiting)
- ✅ Architecture en couches maintenable

---

## 🚀 Quick Start

```bash
# Installation
npm install

# Configuration
cp .env.example .env

# Lancement
npm run dev        # Développement
npm start          # Production
```

**Prérequis**: Node.js v18+, npm v8+

---

## 🔌 API Endpoints

### Products

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/products` | Liste tous les produits |
| `GET` | `/api/products/:id` | Détails d'un produit |

### Orders

| Méthode | Endpoint | Description | Rate Limit |
|---------|----------|-------------|------------|
| `POST` | `/api/orders/preview` | Prévisualiser commande | - |
| `POST` | `/api/orders` | Créer commande | 10/15min |

### Health

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/health` | Vérifier l'état de l'API |

---

## 📋 Exemples de Requêtes

### Prévisualiser une commande

```bash
curl -X POST http://localhost:3001/api/orders/preview \
  -H "Content-Type: application/json" \
  -d '{
    "cart": [
      {"productId": 1, "quantity": 2},
      {"productId": 3, "quantity": 1}
    ]
  }'
```

**Réponse** (200 OK):
```json
{
  "items": [
    {
      "productId": 1,
      "name": "Laptop Pro",
      "price": 1200,
      "quantity": 2,
      "subTotal": 2400
    }
  ],
  "total": 2480
}
```

### Créer une commande

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{"cart": [{"productId": 1, "quantity": 1}]}'
```

**Réponse** (201 Created):
```json
{
  "orderId": "ORD-1705420800000",
  "items": [...],
  "total": 1200,
  "status": "confirmed",
  "createdAt": "2026-01-19T10:30:00.000Z"
}
```

---

## ✅ Validation

### Schéma du panier (Joi)

```javascript
{
  cart: [
    {
      productId: number,  // Entier positif
      quantity: number    // Entre 1 et 100
    }
  ]
}
```

### Codes d'erreur

| Code | Signification |
|------|---------------|
| `400` | Données invalides |
| `404` | Ressource introuvable |
| `409` | Stock insuffisant |
| `429` | Trop de requêtes |
| `500` | Erreur serveur |

---

## 🔒 Sécurité

- 🛡️ **Helmet** - Headers HTTP sécurisés
- 🚦 **Rate Limiting** - 100 req/15min (global), 10 commandes/15min
- 🔒 **CORS** - Origine autorisée : `http://localhost:3000`
- ✅ **Joi** - Validation et sanitization des entrées
- 📝 **Morgan** - Logging des requêtes

---

## 🏗️ Architecture

```
┌─────────────┐
│   Routes    │  Définition des endpoints
└──────┬──────┘
       │
┌──────▼──────┐
│ Controllers │  Gestion HTTP (req/res)
└──────┬──────┘
       │
┌──────▼──────┐
│ Validators  │  Validation Joi
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │  Logique métier
└──────┬──────┘
       │
┌──────▼──────┐
│Repositories │  Accès aux données
└──────┬──────┘
       │
┌──────▼──────┐
│    Data     │  Stockage (mémoire)
└─────────────┘
```

### Structure du projet

```
src/
├── controllers/     # Gestion requêtes HTTP
├── services/        # Logique métier
├── repositories/    # Accès aux données
├── routes/          # Définition endpoints
├── validators/      # Validation Joi
├── data/            # Stockage mémoire
├── app.js           # Configuration Express
└── server.js        # Point d'entrée
```

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```bash
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
ORDER_RATE_LIMIT_WINDOW_MS=900000
ORDER_RATE_LIMIT_MAX_ORDERS=10
```

```bash
cp .env.example .env  # Copier le template
```

---

## 🛠️ Technologies

### Stack Principal

| Package | Version | Rôle |
|---------|---------|------|
| **Node.js** | 18+ | Runtime |
| **Express** | 5.2.1 | Framework web |
| **Joi** | 18.0.2 | Validation |

### Sécurité

| Package | Version | Rôle |
|---------|---------|------|
| **helmet** | 8.1.0 | Headers sécurisés |
| **cors** | 2.8.5 | CORS |
| **express-rate-limit** | 8.2.1 | Anti-abus |

### Utilitaires

| Package | Version | Rôle |
|---------|---------|------|
| **morgan** | 1.10.1 | Logging |
| **dotenv** | 17.2.3 | Config .env |
| **bcrypt** | 6.0.0 | Hash passwords (future) |
| **jsonwebtoken** | 9.0.3 | JWT (future) |

---

## 🚦 Roadmap

- [ ] Migration PostgreSQL
- [ ] Authentification JWT
- [ ] Tests unitaires (Jest)
- [ ] Documentation Swagger
- [ ] Dockerisation

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m "✨ Add: Ma feature"`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

---

## 👤 Auteur

**Hawra Sallami**  
Développeuse Full Stack

📧 sallamihawraa@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/hawra-sallami-41764029a)  
