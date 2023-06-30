import React, { useState } from "react";
import ProductForm from "./ProductForm";
import AddIcon from "@mui/icons-material/Add";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <div className="h-screen">
      <div className="flex justify-end px-4 py-2">
        <button
          className="flex items-center bg-secondary-700 text-white h-10 rounded-md px-4"
          type="submit"
          onClick={() => setShowProductForm(true)}
        >
          <AddIcon className="mr-2" />
          <h1 className="text-lg font-semibold"> Product</h1>
        </button>
      </div>
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
};

export default Products;
