import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './plantlist.css';

const PlantList = ({ plants, addToCart, searchTerm }) => {
  const navigate = useNavigate();

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyNow = (plant) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login or signup!");
      navigate("/signup");
      return;
    }

    // Navigate to checkout with product in state
    navigate("/checkout", { state: { product: plant } });
  };

  return (
    <div className="plant-list-container">
      <h2>Our Collection of Plants</h2>

      <div className="plant-item-grid">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div key={plant.id} className="plant-card">
              {/* Clickable part goes to product detail page */}
              <Link to={`/product/${plant.id}`} className="plant-link">
                <img
                  src={Array.isArray(plant.images) ? plant.images[0] : '/images/placeholder.png'}
                  alt={plant.name}
                  className="plant-image"
                />
                <h3 className="plant-name">{plant.name}</h3>
                <p className="plant-price">₹{plant.price.toFixed(2)}</p>
              </Link>

              {/* Buttons */}
              <div className="plant-buttons">
                <button className="add-to-cart" onClick={() => addToCart(plant)}>
                  Add to Cart
                </button>

                <button className="buy-now" onClick={() => handleBuyNow(plant)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlantList;
