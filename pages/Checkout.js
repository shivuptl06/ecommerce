import React from "react";
import { useCart } from "../context/CartContext";
import CheckOutCard from "../components/CheckOutCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
  const { cart = [] } = useCart();
  const navigate = useNavigate(); // Use useNavigate

  function proceedToPayement() {
    toast.success("Added To Your Order");
    navigate("/"); // Redirect to landing page
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">Checkout</h2>
      <div className="flex justify-center m-4">
        <button
          onClick={proceedToPayement} // Use a button for navigation
          className="p-2 border flex justify-center items-center bg-blue-600 text-white rounded w-2/3 md:w-1/3"
        >
          Proceed To Payment
        </button>
      </div>
      <CheckOutCard product={cart} />
    </div>
  );
};

export default Checkout;
