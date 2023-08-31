import React, { useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import { Row, Tabs, Col } from "antd";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/LoaderSlice";
import { addProduct, editProduct } from "../../apicalls/products.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Images from "./Images";
import { addNotification } from "../../apicalls/Notifications";

const ProductForm = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState("1");
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await editProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await addProduct(values);
      }

      dispatch(setLoader(false));
      if (response.success) {
        toast.success(response.message);
        getData();
        setShowProductForm(false);

        await addNotification({
          title: "New Product",
          message: `${user.firstName} has added a new product, Edit status`,
          user: "649c7bb96d2771a121c34dcb",
          read: false,
          onclick: "/profile",
        });
      } else {
        toast.error(error.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(setLoader(false));
    }
    console.log(values);
  };
  const formRef = React.useRef(null);
  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  const extraFeatures = [
    {
      label: "Bill Available",
      name: "billAvailable",
    },
    {
      label: "Box Available",
      name: "boxAvailable",
    },
    {
      label: "Warrant Available",
      name: "warrantAvailable",
    },
  ];
  return (
    <div>
      <Modal
        title=""
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        okText="Save"
        onOk={() => formRef.current.submit()}
        centered
        className="custom-modal"
        {...(activeTab === "2" && { footer: false })}
      >
        <div>
          <h1 className="text-center  text-2xl ">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h1>
          <Tabs
            defaultActiveKey="1"
            activeTab={activeTab}
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane tab="info" key="1">
              <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter the name" }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please enter the description" },
                  ]}
                >
                  <TextArea type="text" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Price (ksh)"
                      name="price"
                      rules={[
                        { required: true, message: "Please enter the price" },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Age (years)"
                      name="age"
                      rules={[
                        { required: true, message: "Please enter the age" },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Category"
                      name="category"
                      rules={[
                        {
                          required: true,
                          message: "Please select the category",
                        },
                      ]}
                    >
                      <select name="" id="" className="h-[35px] p-2 border">
                        <option value="electronics">Electronics</option>
                        <option value="electronics">Electronics</option>
                        <option value="home">Home</option>
                        <option value="fashion">Fashion</option>
                        <option value="sports">Sports</option>
                      </select>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="flex gap-10">
                  {extraFeatures.map((detail) => (
                    <Form.Item
                      label={detail.label}
                      name={detail.name}
                      key={detail.name}
                      valuePropName="checked"
                    >
                      <Input type="checkbox" />
                    </Form.Item>
                  ))}
                </div>
                <div className="text-center">
                  <p>Note</p>
                  <p>
                    To add product images, save the data, navigate to edit and
                    upload the images
                  </p>
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
              <Images
                selectedProduct={selectedProduct}
                getData={getData}
                setShowProductForm={setShowProductForm}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductForm;
