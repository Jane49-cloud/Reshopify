import React from "react";
import Modal from "antd/es/modal/Modal";

const Notification = ({
  notifications = [],
  showNotifications,
  setShowNotification,
  reloadNotification,
}) => {
  return (
    <div>
      <Modal
        title="Notifications"
        onCancel={() => setShowNotification(false)}
        open={showNotifications}
        // onOk={() => formRef.current.submit()}
        className="custom-modal"
        width={500}
      >
        <div className="flex flex-col gap-2  ">
          {notifications.map((notification) => (
            <div
              className="flex flex-col gap-2 shadow border-solid border-red-600 p-2"
              key={notification}
            >
              <h1>{notification.title}</h1>
              <hr />
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Notification;
