import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProduct } from "../apicalls/products.actions";
import { setLoader } from "../redux/LoaderSlice";
import fallback from "../assets/fallback.png";
import { useNavigate, useParams } from "react-router-dom";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProduct(id);
      if (response.success) {
        setProduct(response.data);
        console.log(response.data);
      }
      dispatch(setLoader(false));
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <img
            src={product?.images[selectedImageIndex] || fallback}
            className="h-96 w-full object-cover rounded-md"
            alt=""
          />
          <div className="flex gap-4">
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className={
                  "h-16 w-16 object-cover rounded-md bg-gray-100 cursor-pointer" +
                  (index === selectedImageIndex
                    ? " border-2 border-secondary-800"
                    : "")
                }
                alt=""
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-2xl font-semibold text-secondary-800">
              {product?.name}
            </p>
            <span>{product?.description}</span>
          </div>
          <hr />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-secondary-800">
              Product Details
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <span>Price</span>
              <span>ksh {product?.price}</span>
              <span>Category</span>
              <span> {product?.category}</span>
              <span>Warranty Available</span>
              <span> {product?.warrantAvailable ? "Yes" : "No"}</span>
              <span>Box Available</span>
              <span> {product?.boxAvailable ? "Yes" : "No"}</span>
              <span>Bill Available</span>
              <span> {product?.billAvailable ? "Yes" : "No"}</span>
            </div>
          </div>
          <hr />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-secondary-800">
              Seller Details
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <span>Name</span>
              <span>
                {product?.seller.firstName} {product?.seller.lastName}
              </span>
              <span>Contact</span>
              <span> {product?.seller.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;