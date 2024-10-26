import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function PayCard({ totalPrice }) {
  const [couponCode, setCouponCode] = useState("");
  const { cart } = useCart();
  const [discount, setDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const totalDiscount = cart.length * 3; // Example: 3 dollars discount per item
    setDiscount(totalDiscount.toFixed(2));
  }, [cart]);

  function applyCoupon() {
    if (couponCode === "SAVE10" && couponApplied===false) {
      setCouponDiscount(10);
      setCouponApplied(true);
      toast.success("Coupon applied successfully!");
    } else if (couponApplied) {
      toast.error("Coupon code is already applied");
    } else {
      setCouponDiscount(0);
      toast.error("Coupon Code Invalid");
    }
    setCouponCode("");
  }

  const finalTotal = (
    Number(totalPrice) -
    Number(discount) -
    couponDiscount
  ).toFixed(2);

  return (
    <div className="flex flex-col border max-w-11/12 p-5">
      {/* Coupon Section */}
      <div className="flex justify-center items-center mb-4">
        <FontAwesomeIcon icon={faTag} className="mr-2" size="lg" />
        <span className="font-semibold text-xl text-center">
          Have a Coupon?
        </span>
      </div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="border rounded-md p-1 flex-grow"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="border p-1 rounded-md bg-gray-500 text-white"
          onClick={applyCoupon}
        >
          Apply
        </button>
      </div>

      {/* Price Section */}
      <div className="flex border-t pt-4 mt-4 space-x-12 justify-between">
        <span className="font-semibold text-lg">
          Price ({cart.length} Items) :
        </span>
        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex space-x-12 justify-between mt-2">
        <span className="font-semibold text-lg">Discount :</span>
        <span className="font-bold text-lg">${discount}</span>
      </div>
      <div className="flex space-x-12 justify-between mt-2">
        <span className="font-semibold text-lg">Delivery Charges :</span>
        <span className="font-bold text-lg">FREE</span>
      </div>
      <div className="flex space-x-12 justify-between mt-2">
        <span className="font-semibold text-lg">Coupon Discount :</span>
        <span className="font-bold text-lg">${couponDiscount.toFixed(2)}</span>
      </div>
      <div className="flex border-t pt-4 mt-4 space-x-12 justify-between">
        <span className="font-semibold text-lg">Total :</span>
        <span className="font-bold text-lg">${finalTotal}</span>
      </div>
    </div>
  );
}

export default PayCard;
