import React, { useEffect, useState } from "react";
import ProductForm from "../products/ProductForm";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/LoaderSlice";
import { getProducts } from "../../apicalls/products.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import { Delete, Edit } from "@mui/icons-material";
import {
  deleteProduct,
  editProductStatus,
} from "../../apicalls/products.actions";

const Products = () => {
  const [Products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const onStatusChange = async (id, status) => {
    try {
      const response = await editProductStatus(id, status);
      if (response.success) {
        toast.success(response.message);
        getData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {}
  };

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProducts(null);
      if (response.success) {
        setProducts(response.products);
      }
      dispatch(setLoader(false));
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoader(false));
    }
  };
  const DeleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await deleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        toast.success(response.message);
        getData();
      } else {
        dispatch(setLoader(false));
        toast.error(error.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const TableData = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "firstName",
      render: (text, record) => {
        return record.seller.firstName + " " + record.seller.lastName;
      },
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
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Update Status",
      dataIndex: "updatedAt",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusChange(_id, "approved")}
              >
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusChange(_id, "rejected")}
              >
                Reject
              </span>
            )}
            {status === "rejected" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusChange(_id, "Block")}
              >
                Block
              </span>
            )}
            {status === "approved" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusChange(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusChange(_id, "approved")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex mr-2 gap-3">
            <Edit
              className="text-secondary-800 "
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            />
            <Delete
              className="text-primary-600 "
              onClick={() => DeleteProduct(record._id)}
            />
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
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
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
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}

      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Products;
