//Imports
import React, { useState } from "react";

//Search Component Function
function Search({ onSearch }) {
  //State Declaration
  //'query' variable to save the state
  //'setQery' function to update state variable
  //initial the state as empty string
  const [query, setQuery] = useState("");

  //Event Handler Function
  //it takes an event (e) as an argument. The function called whenever input value change
  function handleChange(e) {
    //use the intered value in the input field and updates the 'query' state
    setQuery(e.target.value);
    //calls 'onSearch' function with the new input value, allowing the parent component to respond to the search query changes
    onSearch(e.target.value);
  }

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search for dishes"
        value={query}
        //every time the user types something in the input field, 'handleChange' is called, updating the state and calling the 'onSearch' function with the new input value
        onChange={handleChange}
      />
    </div>
  );
}

//make the 'Search Component' available for import in other files
export default Search;
