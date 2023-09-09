import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../apicalls/products.actions";
import { setLoader } from "../redux/LoaderSlice";
import fallback from "../assets/fallback.png";
import { useNavigate } from "react-router-dom";
import Filters from "../components/filters";
import FilterListIcon from "@mui/icons-material/FilterList";

const Home = () => {
  const [showFilters, setShowFilters] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProducts(filters);
      if (response.success) {
        setProducts(response.products);
      }
      dispatch(setLoader(false));
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoader(false));
    }
  };

  React.useEffect(() => {
    console.log(filters);
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          setFilters={setFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          showFilters={setShowFilters}
          className="filters"
        />
      )}

      <div>
        <div className="flex gap-5 item-center p-5 ">
          <FilterListIcon
            onClick={() => setShowFilters(true)}
            className="text-xl"
          />
          <input
            type="text"
            placeholder="search..."
            className="w-full rounded border border-solid cursor-pointer p-2 focus:outline-none focus:border-gray-50"
          />

          <button
            type="submit"
            className="p-2 text-center bg-gray-500 text-white rounded"
          >
            Search...
          </button>
        </div>

        <div
          className={`
      grid gap-3 p-2 ${
        showFilters
          ? "grid-cols-3 responsive-example-2"
          : "grid-cols-4 responsive-example"
      }
      `}
        >
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="max-w-sm bg-white rounded-lg overflow-hidden flex-col gap-2 cursor-pointer responsive-item"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={
                    product.images.length === 0
                      ? fallback
                      : product.images[0] || product.images[1]
                  }
                  className="h-52 w-full object-cover p-5 rounded-md"
                  alt=""
                />
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{product.name}</p>
                  <p className="text-sm text-gray-700 ">
                    {product.description}
                  </p>
                  <p className="text-gray-600">Ksh {product.price}</p>
                  <div className="mt-4 relative">
                    <button
                      className="text-secondary-700 h-10 w-40 rounded-md"
                      style={{ backgroundColor: "transparent", border: "none" }}
                      type="submit"
                    >
                      <strong className="text-xl text-center">Add Bid</strong>
                    </button>
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{ backgroundColor: "#000000", opacity: 0.1 }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {products.length === 0 && (
          <div className="text-center text-gray-500 text-lg py-2 bg-gray-100 rounded p-4 m-5">
            We apologize, but it seems there are no products available in this
            category at the moment. Please explore our other categories or
            refine your search to discover exciting products!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
