import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center bg-black z-10 justify-center h-screen opacity-40">
      <div className="animate-spin rounded-full border-t-4 border-b-4  border-dashed h-12 w-12 "></div>
    </div>
  );
};

export default Loader;
