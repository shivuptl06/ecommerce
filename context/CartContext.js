// // src/context/CartContext.js

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// // Create CartContext
// const CartContext = createContext();

// // Create a provider component
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   let cartItems;
//   useEffect(() => {
//     cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCart(cartItems);
//   }, []);

//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     cartItems = [...cart, product];
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     console.log(localStorage.getItem("cartItems"));
//     toast.success("Added To Cart");
//   };

//   const removeFromCart = (item, index) => {
//     const filteredItems = cart.filter((prevCart) => prevCart.id !== item.id);
//     setCart(filteredItems);
//     console.log("New Cart Array", filteredItems);

//     localStorage.setItem("cartItems", JSON.stringify(filteredItems));
//     toast.success("Removed from cart");
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Create a custom hook to use the CartContext
// export const useCart = () => {
//   return useContext(CartContext);
// };
