// src/mycomponents/SeedItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./seedsitem.css";

function SeedItem({ seed, addToCart, user }) {
  const navigate = useNavigate();

  if (!seed) return <p>Seed not found</p>;

  console.log("SeedItem loaded with:", seed);


  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    // Redirect to signup if user is not logged in
    if (!user || !token) {
      alert("Please sign up to buy products!");
      navigate("/signup", { state: { from: window.location.pathname } });
      return;
    }
      // console.log("Navigating to checkout...", seed);
    navigate("/checkout", { state: { product: seed, type: "seed" } });
  };

  return (
    <div className="seed-detail">
      <img src={seed.image} alt={seed.name} className="seed-detail-img" />
      <h2>{seed.name}</h2>
      <p><strong>Scientific Name:</strong> {seed.scientific_name}</p>
      <p>Price: ₹{seed.price}</p>
      <p><em>This image is for reference</em></p>

      <div className="seed-buttons">
        <button onClick={() => addToCart && addToCart(seed)}>Add to Cart</button>
        <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
      </div>
    </div>
  );
}

export default SeedItem;



