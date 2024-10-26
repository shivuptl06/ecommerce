// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import your CartProvider
// import Header from './components/Header'; // Import the Header component
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from './pages/OrderDetails';
import Footer from "./components/Footer";

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* Wrap the application with CartProvider */}
      <Router>
        {/* <Header /> Include Header component here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/order-form" element={<OrderDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
