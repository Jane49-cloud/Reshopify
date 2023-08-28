import Notification from "./model.js";

//add new notifications
export const addNotification = async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.send({
    success: true,
    message: "notification saved successfully..",
  });

  try {
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// get Notifications by userId

export const getNotifications = async (req, res) => {
  try {
    const notification = await Notifications.find({ user: req.body.id }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//delete notification
export const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.send({
    success: true,
    message: "notification deleted...",
  });
  try {
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
