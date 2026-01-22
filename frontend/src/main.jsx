import { StrictMode } from "react"; // enables additional checks and warnings for React components
import { createRoot } from "react-dom/client"; //connects react to the html
import { BrowserRouter } from "react-router-dom"; //enables navigation between different pages without full page reloads
import { Toaster } from "react-hot-toast";
import CartProvider from "./store/CartProvider";
import App from "./App";
import "./main.css";

// Render the app with CartProvider and Toaster for notifications
createRoot(document.getElementById("root")).render(
  // look in the loaded html for the element with id root and render the following inside it
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        {" "}
        {/* provides cart state to the app */}
        <App />
        {/* Toast notification container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#333",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
