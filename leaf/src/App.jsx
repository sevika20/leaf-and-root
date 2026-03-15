import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

import Navbar from "./mycomponents/Navbar.jsx";
import Footer from "./mycomponents/Footer.jsx";
import PlantList from "./mycomponents/Plantlist.jsx";
import PlantItem from "./mycomponents/plantItem.jsx";
import CustomerDashboard from "./mycomponents/CustomerDashboard.jsx";
import SellerDashboard from "./mycomponents/SellerDashboard.jsx";
import CartPage from "./mycomponents/cartpage.jsx";
import SellerLogin from "./mycomponents/SellerLogin.jsx";
import SeedsPage from "./mycomponents/SeedsPage.jsx";
import SeedItem from "./mycomponents/SeedItem.jsx";
import AboutUs from "./mycomponents/AboutUs.jsx";
import PaymentPage from "./mycomponents/PaymentPage.jsx";
import CustomerSignup from "./mycomponents/CustomerSignup.jsx";
import CheckoutPage from "./mycomponents/CheckoutPage.jsx";
import plantData from "./mycomponents/plants.js";
import seedsData from "./data/seeds.js";
import CustomerLogin from "./mycomponents/CustomerLogin.jsx";

// Plant Details Wrapper
function PlantItemWrapper({ addToCart }) {
  const { id } = useParams();
  const plant = plantData.find((p) => p.id === parseInt(id));
  if (!plant) return <p>Plant not found</p>;
  return <PlantItem plant={plant} addToCart={addToCart} showFullDetails={true} />;
}

// Seed Details Wrapper
function SeedItemWrapper({ addToCart }) {
  const { id } = useParams();
  const seed = seedsData.find((s) => s.id === parseInt(id));
  if (!seed) return <p>Seed not found</p>;
  return <SeedItem seed={seed} addToCart={addToCart} />;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Add item to cart and save in localStorage
  const addToCart = (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    alert(`${item.name} added to cart!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <div>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={cartItems.length} />
        <div style={{ padding: "10px" }}>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>Welcome, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/signup" style={{ marginRight: "10px" }}>Customer Signup</Link>
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={<PlantList plants={plantData} addToCart={addToCart} searchTerm={searchTerm} />}
          />
          <Route
            path="/plants"
            element={<PlantList plants={plantData} addToCart={addToCart} searchTerm={searchTerm} />}
          />
          <Route path="/product/:id" element={<PlantItemWrapper addToCart={addToCart} />} />

          <Route path="/seeds" element={<SeedsPage addToCart={addToCart} />} />
          <Route path="/seed/:id" element={<SeedItemWrapper addToCart={addToCart} />} />

          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
          <Route path="/payment" element={<PaymentPage user={user} />} />

          <Route path="/signup" element={<CustomerSignup setUser={setUser} />} />
          <Route path="/Seller-login" element={<SellerLogin />} />
          <Route path="/CustomerLogin" element={<CustomerLogin />} />

          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="*" element={<p>Page not found</p>} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
