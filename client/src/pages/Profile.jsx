import React from "react";
import Products from "../components/products/Products";

import { Tabs } from "antd";
const Profile = () => {
  return (
    <div>
      <Tabs defaultActivityKey="1" className="mt-0">
        <Tabs.TabPane tab="My Products" key={"1"}>
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key={"2"}>
          <h2>bids</h2>
        </Tabs.TabPane>
        <Tabs.TabPane tab="settings" key={"3"}>
          <h2>General settings</h2>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
