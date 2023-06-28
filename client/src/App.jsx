import React from "react";
import RoutePaths from "./router";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <RoutePaths />
      </Router>
    </div>
  );
};

export default App;
