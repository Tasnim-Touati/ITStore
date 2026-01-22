// src/store/CartProvider.jsx
import { useState } from "react";
import { CartContext } from "./CartContext";

// Component setup
/**
 * Provides cart state and actions to the app via context.
 * Wrap your app/components with <CartProvider> to access cart via useCart().
 */
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Array of cart items

  // The cart functions
  /**
   * Add a product to the cart
   * If it already exists, increase quantity by 1
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        // Update quantity if product already in cart
        return prev.map(
          (
            p, // loop through previous cart items
          ) =>
            p.id === product.id // find the matching product in cart
              ? { ...p, quantity: p.quantity + 1 } // Increase quantity (...p copies other properties)
              : p, // Keep other products unchanged
        );
      }

      // Add new product to cart with quantity 1
      return [
        ...prev, //keep existing items
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1, // New item starts with quantity 1
        },
      ];
    });
  };

  /**
   * Remove a product from the cart by productId
   */
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    // Filter out the item with matching productId
  };

  /**
   * Update the quantity of a cart item
   * If quantity <= 0, remove the item
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart([]);
  };

  // Provide cart state and actions to children components
  return (
    <CartContext.Provider
      value={{
        cart, // The cart array
        addToCart, // Function to add items
        removeFromCart, // Function to remove items
        updateQuantity, // Function to update quantities
        clearCart, // Function to clear cart
      }}
    >
      {children} {/* any component inside children can access cart context */}
    </CartContext.Provider>
  );
};

export default CartProvider;
