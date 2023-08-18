import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CartList from "./Components/CartList";
import { CartProvider } from "./Components/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <CartList />
    </CartProvider>
  </React.StrictMode>
);
