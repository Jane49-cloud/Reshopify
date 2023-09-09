import React from "react";
import Modal from "antd/es/modal/Modal";
import { useNavigate } from "react-router-dom";

const Notification = ({
  notifications = [],
  showNotifications,
  setShowNotification,
  reloadNotification,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        title="Notifications"
        onCancel={() => setShowNotification(false)}
        open={showNotifications}
        className="custom-modal"
        width={500}
      >
        <div className="flex flex-col gap-2  ">
          {notifications.map((notification) => (
            <div
              className="flex flex-col cursor-pointer mt-2 gap-2 shadow-md border-solid border-red-600 p-2"
              key={notification}
              onClick={() => {
                navigate(notification.onclick);
                setShowNotification(false);
              }}
            >
              <h1 className="text-xl">{notification.title}</h1>
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
