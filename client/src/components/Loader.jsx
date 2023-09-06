import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center bg-black z-[9999] justify-center h-screen opacity-40">
      <div className="loader "></div>
    </div>
  );
};

export default Loader;
