import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DishDetails() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDish(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading dish details...</p>;
  }

  if (!dish) {
    return <p>Dish not found.</p>;
  }

  return (
    <div className="dish-details-page">
      <h2 className="dish-name-details-page">{dish.name}</h2>
      <div className="dish-details-container">
        <div className="dish-image-container">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-image-details-page"
          />
        </div>
        <div className="dish-text-container">
          <p className="dish-calories-details-page">
            Calories: {dish.caloriesPerServing}
          </p>
          <p className="dish-cuisine-details-page">Cuisine: {dish.cuisine}</p>
          <p className="dish-ingredients-details-page">
            Ingredients: {dish.ingredients.join(", ")}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DishDetails;
