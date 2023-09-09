import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center bg-gray-50 z-[9999] justify-center h-screen ">
      <div className="loader "></div>
    </div>
  );
};

export default Loader;
