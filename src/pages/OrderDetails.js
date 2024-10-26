import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import PayCard from "../components/PayCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function OrderDetails() {
  const [totalCost, setTotalCost] = useState(0);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    console.log("Current cart:", cart); // For debugging purposes

    const calculateTotalPrice = () => {
      if (cart.length > 0) {
        const total = cart.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0
        );
        setTotalCost(total);
      } else {
        setTotalCost(0);
      }
    };

    calculateTotalPrice();
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User details submitted:", userDetails);
  };

  const isAnyFieldEmpty = () => {
    return Object.values(userDetails).some((value) => value.trim() === "");
  };

  const handleOrder = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isAnyFieldEmpty()) {
      toast.error("Please fill in all the details");
    } else {
      toast.success("Your Order Has Been Placed");
      navigate("/");

      // Additional order handling logic can go here
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center lg:min-h-[90vh] p-5 space-y-5 lg:space-y-0">
      <div className="w-full lg:w-1/4">
        <PayCard totalPrice={totalCost} />
      </div>
      <div className="border border-gray-300 flex-1 max-w-xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userDetails.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userDetails.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={userDetails.postalCode}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            onClick={handleOrder}
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
