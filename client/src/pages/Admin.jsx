import React from "react";
import { Tabs } from "antd";
import Products from "../components/Admin/Products";
import Users from "../components/Admin/Users";

const Admin = () => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Product" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
        <Tabs.TabPane tab="bids" key="3"></Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
