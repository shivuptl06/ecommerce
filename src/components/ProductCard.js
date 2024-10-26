import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const discountedPrice = product.price - 3; 

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
      </Link>
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="text-gray-700 font-light text-base">
          WAS:
          <span className="text-gray-400 line-through font-light text-base">
            {" "}
            ${product.price}
          </span>
        </p>
        <div className="flex items-baseline">
          <span className="text-black-700 font-extrabold text-2xl">NOW:</span>
          <span className="text-red-500 font-extrabold text-2xl">
            {" "}
            ${discountedPrice}
          </span>
        </div>
        <p className="mt-4 p-2">{product.description}</p>
      </div>
      <div className="m-2">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
