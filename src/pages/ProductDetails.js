import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import Shopping Cart icon
import "./css/ProductDetails.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  function handleAddToCart(product) {
    addToCart(product);
    navigate("/");
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" m-10 p-4 w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 text-center border rounded-xl shadow-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-contain mb-4"
        />
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <div>
          <p className="text-gray-700 font-light text-base">
            WAS:
            <span className="text-gray-400 text-sliced font-light text-base">
              {" "}
              ${product.price}
            </span>
          </p>
        </div>
        <div>
          <span className="text-black-700 font-extrabold text-2xl">NOW:</span>
          <span className="text-red-500 font-extrabold text-2xl">
            {" "}
            ${product.price - 3}
          </span>
        </div>
        <p className="mt-4">{product.description}</p>
        <div>
          <button
            className="border my-5 bg-blue-600 p-2 rounded-xl w-full shadow-lg"
            onClick={() => handleAddToCart(product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
