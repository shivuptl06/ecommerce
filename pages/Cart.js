import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

const Cart = ({ closeCart }) => {
  const { cart = [] } = useCart();
  const cartRef = useRef();

  // Close the cart when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCart]);

  // useEffect((cart)=>{
  //   cart.map((item)=>{
  //     localStorage.setItem('cartItems',item);
  //     return "";
  //   })
  // },[cart])

  return (
    <div ref={cartRef} className="absolute right-0 top-16 bg-white shadow-lg rounded-md p-4">
      <h2 className="font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>{item.title} - Quantity: {item.quantity}</li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
