import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation

const Header = () => {
  const handleLogin = () => {
    toast.success("Logged in successfully!");
  };

  const handleSignup = () => {
    toast.success("Signed up successfully!");
  };

  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <nav>
        <ul className="flex space-x-4">
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="/cart" className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
              Cart
            </Link>
          </li>
          <li
            className="cursor-pointer hover:text-blue-600"
            onClick={handleLogin}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
            Login
          </li>
          <li
            className="cursor-pointer hover:text-blue-600"
            onClick={handleSignup}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
            Signup
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
