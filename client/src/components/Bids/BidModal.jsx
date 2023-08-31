import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/LoaderSlice";
import { placeBid } from "../../apicalls/products.actions";
import { toast, ToastContainer } from "react-toastify";
import { addNotification } from "../../apicalls/Notifications";

const BidModal = ({ showNewBid, setShowNewBid, product, getData }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formRef = React.useRef(null);

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await placeBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      if (response.success) {
        toast.success(response.message);
        getData();
        setShowNewBid(false);
      }

      await addNotification({
        title: "New bid",
        message: `${user.firstName} has places a new bid on ${product.name} for ksh ${values.bidAmount}`,
        user: product.seller._id,
        onclick: "/profile",
        read: false,
      });
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoader(false));
    }
  };

  return (
    <Modal
      onCancel={() => setShowNewBid(false)}
      open={showNewBid}
      centered
      onOk={() => formRef.current.submit()}
      className="custom-modal"
      width={500}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-center">Place A Bid</h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name={"bidAmount"}>
            <Input type="number" placeholder="Place your bid" required />
          </Form.Item>
          <Form.Item label="Mobile" name={"mobileNo"}>
            <Input placeholder="Enter your phone number" required />
          </Form.Item>

          <Form.Item label="Bid Message" name={"bidMessage"}>
            <TextArea placeholder="Any delivery preference" required />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModal;
