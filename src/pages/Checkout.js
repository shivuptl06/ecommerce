import React from "react";
import { useCart } from "../context/CartContext";
import CheckOutCard from "../components/CheckOutCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
  const { cart = [] } = useCart();
  const navigate = useNavigate(); // Use useNavigate

  function proceedToPayment() {
    toast.success("Added To Your Order");
    navigate("/order-form"); // Redirect to order form page
  }

  return (
    <div className="p-4 w-full flex flex-col">
      <h2 className="text-2xl font-bold text-center">Checkout</h2>
      <CheckOutCard product={cart} />
      <div className="sticky bottom-0 p-4 bg-white shadow-md">
        <div className="flex justify-center">
          <button
            onClick={proceedToPayment}
            className="p-2 border flex justify-center items-center bg-blue-600 text-white rounded w-2/3 md:w-1/3"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
