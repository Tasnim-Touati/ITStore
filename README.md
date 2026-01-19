# 🛒 ITStore

A full-stack e-commerce application built with React and Node.js, featuring product browsing, shopping cart management, and order processing with real-time stock validation and basic security best practices.

![Application Screenshot](Website.png)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Security Features](#security-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Team & Collaboration](#team--collaboration)
- [License](#license)

---

## 🎯 Overview

The goal of this project is to demonstrate:
- a clean full-stack architecture
- proper separation of concerns between frontend and backend
- a simple yet correct product ordering workflow
- basic software engineering and security principles
The backend acts as the single source of truth, exposing a REST API responsible for business logic, while the frontend consumes the API and focuses on user interaction.

---

## ✨ Features

### User Features
- **Product Catalog**: Browse 11 tech products with images, prices, and stock status
- **Product Details**: View detailed information, features, and related products
- **Shopping Cart**: Add/remove items, adjust quantities, view real-time totals
- **Stock Validation**: Intelligent stock checking with adjustment dialog
- **Order Processing**: Place orders with automatic stock updates

### Technical Features
- **RESTful API**: Clean, structured backend endpoints
- **React Context API**: Global state management for cart
- **Custom Hooks**: Reusable logic for cart and products
- **Error Handling**: Comprehensive validation and user-friendly error messages
- **Security Basics**: Standard protections against common web vulnerabilities
---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Justification |
|------------|---------|---------------|
| **React 18** | UI Framework | Component-based architecture, virtual DOM for performance|
| **React Router** | Navigation | Single-page application routing|
| **Vite** | Build Tool | optimized builds, modern development experience |
| **Axios** | HTTP Client | Promise-based, interceptors, automatic JSON transformation |
| **react-hot-toast** | Notifications | Lightweight, customizable |
| **CSS3** | Styling | Custom animations, gradients, full control over design |

### Backend
| Technology | Purpose | Justification |
|------------|---------|---------------|
| **Node.js** | Runtime | JavaScript everywhere, vast npm ecosystem |
| **Express.js** | Web Framework | Minimalist, flexible, industry standard for Node APIs |
| **Helmet** | Security | HTTP header security, XSS protection, industry standard |
| **express-rate-limit** | Rate Limiting | DDoS protection, API abuse prevention |
| **Joi** | Validation | Robust schema validation, clear error messages |
| **CORS** | Cross-Origin | Secure frontend-backend communication |

---

## 📁 Project Structure
```
ITStore/
├── frontend/
│   ├── public/
│   ├── src/
│   └── README.md
├── backend/
│   ├── src/
│   └── README.md
└── README.md

```
---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** 

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Tasnim-Touati/shopy
cd shopping-app
```

2. **Setup Backend**
```bash
cd backend
npm install # Install dependencies
cp .env.example .env # Configure environment
# Edit .env with your settings (optional, has defaults)

npm run dev # Start server
# Backend runs on http://localhost:3001
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install # Install dependencies
npm run dev # Start development server
# Frontend runs on http://localhost:5173
```

4. **Access the application**
- Open your browser and navigate to `http://localhost:5173`
- The backend API is accessible at `http://localhost:3001/api`

---

## 📡 API Documentation

See [Backend README](./backend/README.md) for detailed API documentation.

### Reference

**Base URL**: `http://localhost:3001/api`

| Method | Endpoint | Description | 
|--------|----------|-------------|
| GET | `/products` | Fetch all products | 
| GET | `/products/:id` | Get single product with related items |
| POST | `/orders/preview` | Preview order & validate stock |
| POST | `/orders/create` | Create order & update stock | 

---

## 👥 Team & Collaboration

### Project Contributors

**Hawra Sallami** - Backend Developer
- Complete backend architecture (controllers, services, repositories)
- REST API design and implementation
- Security implementation (Helmet, rate limiting, validation)
- Stock validation logic
  
**Tasnim Touati** - Frontend Developer
- React component architecture
- Shopping cart functionality with Context API
- Product detail page with related products
- UI/UX design and styling
- Stock validation dialog implementation
  
Both contributors collaborated on integration, testing, and documentation.

---

## 📝 License

This project was created as part of an internship technical assessment.

---

## 📞 Contact

For questions or feedback, please contact:
- **Tasnim Touati**: tasnimtouati301@gmail.com
- **Hawra Sallami**: sallamihawraa@gmail.com
