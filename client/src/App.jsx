import React from "react";
import RoutePaths from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div className="bg-gray-50 h-screen">
      {loading && <Loader />}
      <Router>
        <RoutePaths />
      </Router>
    </div>
  );
};

export default App;
