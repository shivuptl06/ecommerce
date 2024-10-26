// src/context/CartContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create CartContext
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(cartItems);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      let updatedCart;

      if (existingProductIndex !== -1) {
        // Increment the quantity
        updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add the new product with quantity 1
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
    toast.success("Added To Cart", { autoClose: 500 });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((product) =>
          product.id === item.id
            ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
            : product
        )
        .filter((product) => product.quantity > 0);

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
    toast.success("Removed from cart", { autoClose: 500 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
