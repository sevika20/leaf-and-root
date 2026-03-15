import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function SellerDashboard() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("token"); // if JWT auth
        const res = await fetch(API_URL, {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
        });

        if (!res.ok) throw new Error("Failed to fetch plants");
        const data = await res.json();
        setPlants(data);  // Save fetched plants
        console.log("Fetched plants:", data);
      } catch (err) {
        console.error("Error fetching plants:", err);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h2>Seller Dashboard</h2>
      {plants.length === 0 ? (
        <p>No plants available.</p>
      ) : (
        <ul>
          {plants.map((plant) => (
            <li key={plant._id || plant.id}>
              {plant.name} - ₹{plant.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

