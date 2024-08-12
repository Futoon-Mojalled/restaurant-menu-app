// Import necessary modules from React and other files.
import React, { useState, useEffect } from "react"; // Import React and hooks from the React library.
import { Link } from "react-router-dom";
import Search from "./Search"; // Import the Search component for search functionality.
import orange3 from "../assets/orange3.svg"; // Import an image for the logo.
import "../index.css"; // Import CSS styles for the component.

function Menu() {
  // State variables for storing dishes, search query, selected meal type, and meal types.
  const [dishes, setDishes] = useState([]); // Holds the list of dishes fetched from the API.
  const [filterdDishes, setFilterdDishes] = useState([]); // Holds the list of filtered dishes fetched from the API.
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search query for filtering dishes.
  const [selectedMealType, setSelectedMealType] = useState(""); // Holds the currently selected meal type for filtering.
  const [mealTypes, setMealTypes] = useState([]); // Holds the list of unique meal types for filter buttons.
  const [loading, setLoading] = useState(true); // State to track the loading status.

  // useEffect hook to fetch data from the API when the component mounts.
  useEffect(() => {
    fetch("https://dummyjson.com/recipes") // Fetch data from the API endpoint.
      .then((response) => response.json()) // Convert the response to JSON format.
      .then((data) => {
        if (selectedMealType !== "") {
          setLoading(false);
          const filteredData = data.recipes.filter(
            (d) =>
              d.mealType[0].toLowerCase() ===
              selectedMealType.toLocaleLowerCase()
          );

          setDishes(filteredData);
          console.log({ filteredData });
          return;
        }
        setDishes(data.recipes); // Update the state with the fetched dishes.

        // Extract unique meal types from the fetched data.

        const uniqueMealTypes = [
          ...new Set(data.recipes.map((d) => d.mealType[0])),
        ];

        console.log({ uniqueMealTypes });

        setMealTypes(uniqueMealTypes); // Update the state with the unique meal types.
        setLoading(false); // Set loading to false after data is fetched.
      });
  }, [selectedMealType]); // Empty dependency array ensures this effect runs only once after the initial render.

  // Function to handle meal type button clicks and update the selected meal type.
  const handleMealTypeChange = (mealType) => {
    // Set selected meal type to empty string if "All" is clicked; otherwise, set it to the clicked meal type.
    setSelectedMealType(mealType === "All" ? "" : mealType);
  };

  const handleOnSearch = (value) => {
    setSearchQuery(value);
    const filteredDishesResults = () =>
      dishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(value.toLowerCase()) && // Check if dish name includes the search query.
          (selectedMealType === "" || dish.mealType === selectedMealType) // Check if dish meal type matches the selected meal type.
      );

    setFilterdDishes(filteredDishesResults);
  };

  const renderHomeItems = () => {
    if (loading) {
      return <p>Loading dishes...</p>;
    }
    if (searchQuery !== "") {
      if (filterdDishes.length >= 1) {
        return filterdDishes.map((dish) => (
          <div className="dish" key={dish.id}>
            {/* <Link to={'/dish/'+dish.id}> */}
            <Link to={`/dish/${dish.id}`} className="no-underline">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <p className="dish-name">{dish.name}</p>
              <p className="dish-calories">
                {dish.caloriesPerServing} calories
              </p>
            </Link>
          </div>
        ));
      } else {
        return <p>No dishes found.</p>;
      }
    }

    return dishes.map((dish) => (
      <div className="dish" key={dish.id}>
        {/* <Link to={'/dish/'+dish.id}> */}
        <Link to={`/dish/${dish.id}`} className="no-underline">
          <img src={dish.image} alt={dish.name} className="dish-image" />
          <p className="dish-name">{dish.name}</p>
          <p className="dish-calories">{dish.caloriesPerServing} calories</p>
        </Link>
      </div>
    ));
  };

  console.log({ dishes });
  return (
    <div className="menu-container">
      <img src={orange3} alt="logo" className="logo" />
      <h1 className="page-title">Menu</h1>
      {/* Render the Search component and pass setSearchQuery function as a prop. */}
      <Search onSearch={handleOnSearch} />

      <div className="filter-buttons-container">
        {/* Button to show all dishes */}
        <button
          key="All"
          className={`filter-button ${selectedMealType === "" ? "active" : ""}`}
          onClick={() => handleMealTypeChange("All")}
        >
          All
        </button>

        {/* Render a button for each unique meal type */}
        {mealTypes.map((mealType) => (
          <button
            key={mealType}
            className={`filter-button ${
              selectedMealType === mealType ? "active" : ""
            }`}
            onClick={() => handleMealTypeChange(mealType)}
          >
            {mealType}
          </button>
        ))}
      </div>

      <div className="dishes-container">
        {renderHomeItems()}
        {/* // If the loading state is true, display "Loading dishes..." */}

        {/* <p>No dishes found.</p> */}
        {/* Message to display if no dishes match the filter criteria. */}
      </div>
    </div>
  );
}

// Export the Menu component for use in other parts of the application.
export default Menu;
