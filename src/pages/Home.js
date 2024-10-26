import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const isInCategory = category === "all" || product.category === category;
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Price range filtering
    let isInPriceRange = true;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      isInPriceRange = product.price >= min && product.price <= max;
    }

    return isInCategory && matchesSearchTerm && isInPriceRange;
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Search Bar Section */}
      <div className="flex justify-center p-4 w-full">
        <form
          onSubmit={handleSearch}
          className="flex justify-center w-full max-w-3xl"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 rounded-2xl border border-gray-300 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row container mx-auto p-4 w-full">
        <div className="w-full md:w-1/6 mb-4 pr-5 sm:w-1/3">
          <h3 className="font-semibold mb-2">Filter by Category</h3>
          <select
            className="bg-gray-700 text-white mb-4 p-2 rounded w-full"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <h3 className="font-semibold mb-2">Filter by Price</h3>
          <select
            className="bg-gray-700 text-white mb-4 p-2 rounded w-full"
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Select Price Range</option>
            <option value="1-50">1 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100-150">100 - 150</option>
            <option value="150-200">150 - 200</option>
            <option value="200-1000">200+</option>
          </select>
        </div>

        {/* Featured Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-3/4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
