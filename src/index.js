import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
