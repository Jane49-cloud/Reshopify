import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  return (
    <div className="w-72 bg-gray-50 h-screen sticky">
      <div className="flex justify-between p-3">
        <h1>filters</h1>
        <CloseIcon onClick={() => setShowFilters(!showFilters)} />
      </div>
    </div>
  );
};

export default Filters;
