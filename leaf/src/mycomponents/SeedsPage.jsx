import React from "react";
import seedsData from "../data/seeds.js";
import { Link, useNavigate } from "react-router-dom";
import "./SeedsPage.css";

export default function SeedsPage({ seeds = seedsData, addToCart, searchTerm = "" }) {
  const navigate = useNavigate();

  const handleBuyNow = (seed) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please sign up to buy seeds!");
      navigate("/signup", { state: { from: window.location.pathname } });
      return;
    }

    // For simplicity, you can later add backend order/payment logic here
    alert(`Proceeding to buy ${seed.name}`);
    // window.location.href = `https://your-payment-gateway.com?seedId=${seed.id}&token=${token}`;
  };

  const filteredSeeds = seeds.filter((seed) =>
    seed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seeds-page">
      <h2>Our Seed Collection</h2>

      <div className="seeds-grid">
        {filteredSeeds.length > 0 ? (
          filteredSeeds.map((seed) => (
            <div key={seed.id} className="seed-item">
              <Link to={`/seed/${seed.id}`}>
                <img src={seed.image} alt={seed.name} className="seed-img" />
              </Link>
              <h3>{seed.name}</h3>
              <p>₹{seed.price}</p>

              <div className="seed-buttons">
                <button className="add-to-cart" onClick={() => addToCart(seed)}>
                  Add to Cart
                </button>
                <button className="buy-now" onClick={() => handleBuyNow(seed)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1/-1" }}>No seeds found.</p>
        )}
      </div>
    </div>
  );
}




