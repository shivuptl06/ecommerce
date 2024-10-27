import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
// eslint-disable-next-line
import { toast } from "react-toastify";
import Paycard from "./PayCard";
import "./css/CheckOutCard.css";

function CheckOutCard() {
  const { removeFromCart } = useCart();
  const { cart = [] } = useCart();
  const [totalCost, setTotalCost] = useState(0);

  const removeItemFromCart = (product) => {
    removeFromCart(product);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
      );
      setTotalCost(total);
    };
    calculateTotalPrice();
  }, [cart]);

  if (!cart || cart.length === 0) {
    return (
      <div className="Base-Card min-h-[70vh] flex flex-col overflow-y-auto m-10 md:p-10 space-y-4">
        <div className="text-center justify-center items-center font-semibold text-xl space-y-10">
          <p>No Products To Display😟</p>
          <Link to="/">
            <p className="underline">Please Add An Item to Cart To Checkout</p>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Base-Card min-h-[70vh] m-10 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-center items-center lg:justify-between  space-y-4 md:space-y-0">
          {/* Left Section - Cart Items */}
          <div className="flex-[2] md:pr-12 space-y-4 overflow-y-auto max-h-[65vh] no-scrollbar justify-center items-center xs:w-[130%] lg:max-w-full">
            {cart.map((el, index) => (
              <div
                key={index}
                className="InnerBase-Card p-4 md:p-8 w-full h-auto border rounded-xl flex flex-col md:flex-row items-center"
              >
                <div className="Image flex items-center justify-center w-full md:w-1/3 mb-4 md:mb-0 pr-2">
                  <img
                    src={el.image}
                    alt={el.title}
                    className="w-2/3 md:w-full max-h-[20rem] object-contain"
                  />
                </div>
                <div className="ProductInfo w-full md:w-2/3 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-2">{el.title}</h3>
                  <p className="text-gray-600 font-semibold lg:text-lg">${el.price}</p>
                  <p className="text-gray-500 font-semibold lg:text-lg">Quantity: {el.quantity}</p>
                </div>
                <button
                  className="bg-red-500 p-1 rounded m-3"
                  onClick={() => removeItemFromCart(el)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Section - Payment Card */}
          <div className="w-full md:w-1/4 md:ml-8 hidden md:block">
            <div className="sticky top-4 flex flex-col items-center h-full">
              <Paycard totalPrice={totalCost} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckOutCard;
