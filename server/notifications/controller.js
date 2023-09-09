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
    const notification = await Notification.find({
      user: req.body.userId,
    }).sort({
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
    console.log("this Api call failed", error);
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

export const readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.body.userId,
        read: false,
      },
      {
        $set: { read: true },
      }
    );
    console.log("this api request has been updated and successfully");
    res.send({
      success: true,
      message: "All notifications marked as read..",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};
