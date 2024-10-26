import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Calculate total quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  function handleTitleClick(id) {
    navigate(`/product/${id}`);
    setIsCartOpen(false);
  }

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 flex justify-between items-center p-2 bg-gray-800 text-white z-50 max-h-[60px] md:max-h-[70px] xs:max-h-[50px]">
        <Link
          to="/"
          className="text-2xl font-bold cursor-pointer hover:text-gray-300"
        >
          Ecommerce
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleCart}
            className="focus:outline-none cursor-pointer hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
            <span className="hidden sm:inline">Cart ({totalQuantity})</span>
          </button>

          <div
            className="cursor-pointer hover:text-blue-600"
            onClick={() => toast.success("Logged in successfully!")}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
            <span className="hidden sm:inline">Login</span>
          </div>

          <div
            className="cursor-pointer hover:text-blue-600"
            onClick={() => toast.success("Signed up successfully!")}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
            <span className="hidden sm:inline">Signup</span>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
          <div
            className="bg-white rounded-lg p-4 w-11/12 h-11/12 max-w-md overflow-hidden flex flex-col"
            ref={modalRef}
          >
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            <div className="flex-1 overflow-y-auto max-h-[60vh] xl:min-h-[60vh]">
              {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
              ) : (
                <ol className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-4 border-b pb-2 mb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3
                          className="font-medium cursor-pointer text-blue-500 hover:text-blue-700 underline"
                          onClick={() => handleTitleClick(item.id)}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-700">
                          ${Number(item.price).toFixed(2)} x {item.quantity}
                        </p>
                        <p className="text-gray-700">
                          Total: $
                          {Number(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="bg-red-500 text-white rounded px-2 py-1 text-sm hover:bg-red-600"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <Link to="/checkout">
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                onClick={toggleCart}
              >
                Checkout
              </button>
            </Link>
            <button
              className="mt-4 w-full bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
              onClick={toggleCart}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
