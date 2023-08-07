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
    getData();
  }, []);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          setFilters={setFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          showFilters={setShowFilters}
        />
      )}

      <div>
        <div className="flex gap-5 item-center p-5">
          <FilterListIcon
            onClick={() => setShowFilters(true)}
            className="text-xl"
          />
          <input
            type="text"
            placeholder="search... "
            className="w-full rounded border border-solid cursor-pointer p-2"
          />
        </div>

        <div
          className={`
      grid gap-3 p-2 ${showFilters ? "grid-cols-3" : "grid-cols-4"}
      `}
        >
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden flex-col gap-2 cursor-pointer border-secondary-800 border-2 border-opacity-60 "
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={
                    product.images.length === 0 ? fallback : product.images[0]
                  }
                  className="h-40 w-full object-cover p-5 rounded-md"
                  alt=""
                />
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{product.name}</p>
                  <p className="text-sm text-gray-700 ">
                    {product.description}
                  </p>
                  <p className="text-gray-600">Ksh {product.price}</p>
                  <button
                    className="bg-secondary-800 text-white h-10 w-40 rounded-md hover:bg-secondary-700 mt-4"
                    type="submit"
                  >
                    <strong>Bid</strong>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
