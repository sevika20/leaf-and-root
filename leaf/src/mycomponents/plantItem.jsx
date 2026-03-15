import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlantItem.css";

function PlantItem({ plant, addToCart, showFullDetails }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    console.log("Buy Now clicked for:", plant.name);
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please sign up or login to buy products!");
      navigate("/signup", { state: { from: window.location.pathname } });
      return;
    }

    navigate("/checkout", { state: { product: plant, type: "plant" } });
  };

  const imageSource = Array.isArray(plant.images)
    ? plant.images[0]
    : "/images/placeholder.png";

  return (
    <div className="plant-card">
      <img
        src={imageSource}
        alt={plant.name}
        className={showFullDetails ? "plant-image-large" : "plant-image"}
      />
      <div className="plant-details">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-price">₹{plant.price.toFixed(2)}</p>

        {showFullDetails && (
          <>
            <p>
              <strong>Scientific Name:</strong> {plant.scientific_name}
            </p>
            <p>{plant.description}</p>
            <p>
              <em>This image is for reference</em>
            </p>
          </>
        )}

        <div className="button-to-buy">
          <button onClick={() => addToCart && addToCart(plant)}>Add to Cart</button>
          <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default PlantItem;


