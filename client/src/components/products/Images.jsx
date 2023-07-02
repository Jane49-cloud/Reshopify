import { Button, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoader } from "../../redux/LoaderSlice";
import { uploadImages } from "../../apicalls/products.actions";
import { Delete, Edit } from "@mui/icons-material";

const Images = ({ selectedProduct, getData, setShowProductForm }) => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(selectedProduct.images);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      dispatch(setLoader(true));
      console.log(selectedProduct.Id);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("productId", selectedProduct._id);
      const response = await uploadImages(formdata);
      console.log(formdata, response);
      dispatch(setLoader(false));
      if (response.success) {
        toast.success(response.message);
        setImages([...images, response.data]);
        getData();
        // setShowProductForm(false);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.success(error.message);
    }
  };
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => setFile(info.file)}
      >
        <div className="flex gap-5 ">
          {images.map((image) => {
            return (
              <div className="flex gap-3 border border-solid border-gray-100 rounded p-2 items-end">
                <img
                  src={image}
                  className="h-20 w-20 object-cover,  before:"
                  alt=""
                />
                <Delete
                  className="text-gray-500  "
                  onClick={() => DeleteProduct(record._id)}
                />
              </div>
            );
          })}
        </div>
        <Button type="dashed " className="mt-2">
          Upload
        </Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <button
          className="bg-secondary-800 text-gray-20 h-[40px] rounded hover:bg-secondary-700 px-5"
          type="submit"
          onClick={() => setShowProductForm(false)}
        >
          <strong>Cancel</strong>
        </button>
        <button
          className={`bg-secondary-800 text-gray-20 h-[40px] rounded hover:bg-secondary-700 px-5 ${
            !file ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          onClick={upload}
          disabled={!file}
        >
          <strong>Upload</strong>
        </button>
      </div>
    </div>
  );
};

export default Images;
