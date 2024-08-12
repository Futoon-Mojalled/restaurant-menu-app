import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import DishDetails from "./components/DishDetails";
import "./index.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/dish/:id" component={DishDetails} />
      </Switch>
    </Router>
  );
}

export default App;
