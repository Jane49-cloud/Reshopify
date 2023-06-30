import React from "react";
import RoutePaths from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

const App = () => {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <RoutePaths />
      </Router>
    </div>
  );
};

export default App;
