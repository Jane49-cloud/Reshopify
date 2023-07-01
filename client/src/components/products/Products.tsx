import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/LoaderSlice";
import { getProducts } from "../../apicalls/products.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import { Delete, Edit } from "@mui/icons-material";

const Products = () => {
  const [Products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProducts();
      if (response.success) {
        setProducts(response.products);
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
  const [showProductForm, setShowProductForm] = useState(false);

  const TableData = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex mr-2 gap-3">
            <Edit className="text-secondary-800 " />
            <Delete className="text-primary-600 " />
          </div>
        );
      },
    },
  ];

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
      <div className="p-5 pink-text-gradient">
        <Table
          columns={TableData}
          dataSource={Products}
          className=" border rounded-sm "
        ></Table>
      </div>
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}

      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Products;
