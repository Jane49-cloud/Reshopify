import React from "react";
import Modal from "antd/es/modal/Modal";
import { Row, Tabs, Col } from "antd";
import { Tab, TextField } from "@mui/material";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const ProductForm = ({ showProductForm, setShowProductForm }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  const formRef = React.useRef(null);
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
        title="Create Product"
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        okText="Save"
        onOk={() => formRef.current.submit()}
        centered
        className="custom-modal"
      >
        <Tabs defaultActiveKey="1">
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
                name="describe"
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
                      { required: true, message: "Please select the category" },
                    ]}
                  >
                    <select name="" id="" className="h-[35px] p-2 border">
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
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2"></Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default ProductForm;
