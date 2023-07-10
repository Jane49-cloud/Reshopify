import { Modal, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getBids } from "../../apicalls/products.actions";
import { setLoader } from "../../redux/LoaderSlice";
import { useEffect } from "react";

const Bids = ({ showBidsModal, setShowBidsModal, bids, selectedProduct }) => {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getBids({ product: selectedProduct._id });
      dispatch(setLoader(false));
      if (response.success) {
        setBidsData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Bid Amount", dataIndex: "bidAmount" },
    { title: "Buyer Mobile", dataIndex: "mobileNo" },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => {
        return <span>{record.buyer?.email}</span>;
      },
    },
    {
      title: "Date created",
      dataIndex: "createdAt",
      render: (text, record) => {
        return <span>{new Date(text).toLocaleDateString()}</span>;
      },
    },
    { title: "Message", dataIndex: "bidMessage" },
  ];
  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title="Bids"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      footer={null}
      className="custom-modal"
      width={800}
    >
      <h1 className="text-center">product name: {selectedProduct?.name}</h1>

      <Table columns={columns} dataSource={bidsData}></Table>
    </Modal>
  );
};

export default Bids;
