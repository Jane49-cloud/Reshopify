import { useState, useEffect } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../apicalls/user.actions";
import { setLoader } from "../redux/LoaderSlice";
import { setUser } from "../redux/UserSlice";
import Notification from "../components/Notification";
import {
  IconButton,
  MenuItem,
  Typography,
  FormControl,
  Select,
  InputBase,
} from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNotifications } from "../apicalls/Notifications";

const ProtectedRoutes = ({ children }) => {
  const [notification = [], setNotifications] = React.useState([]);
  const [showNotifications, setShowNotification] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const reloadNotifications = () => {};

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
        toast.success(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };

  const getTheNotifications = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getAllNotifications();
      if (response.success) {
        dispatch(setLoader(false));
        setNotifications(response.data);
        console.log(notification);
        console.log(notification.length);
        console.log("hello world!");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  };

  useEffect(() => {
    validateToken();
    getTheNotifications();
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken && !user) {
      navigate("/");
    }
  }, [user]);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-5 bg-gray-100 text-white">
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
          >
            <strong className="text-secondary-800 shadow-sm text-2xl">
              𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆
            </strong>
          </Typography>
          <div className="flex items-center">
            {/* User Profile */}
            <div className="mr-3" style={{ position: "relative" }}>
              <IconButton
                style={{
                  color: "#991b1b",
                  backgroundColor: "#eee",
                  cursor: "pointer",
                }}
                onClick={() => setShowNotification(true)}
              >
                <NotificationsActive />
              </IconButton>
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                {notification?.length}
              </div>
            </div>

            <div className="flex items-center">
              <FormControl variant="standard" value={user.firstName}>
                <Select
                  value={user.firstName}
                  sx={{
                    backgroundColor: "#eee",
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "#eee",
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem
                    value={user.firstName}
                    onClick={() => {
                      if (user.role === "admin") {
                        navigate("/admin");
                      } else {
                        navigate("/profile");
                      }
                    }}
                  >
                    <Typography>{user.firstName}</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div>{children}</div>

        <div className="flex justify-center mt-4">
          {/* <ToastContainer /> */}
        </div>
        <Notification
          showNotifications={showNotifications}
          setShowNotification={setShowNotification}
          notifications={notification}
          reloadNotification={reloadNotifications}
        />
      </div>
    )
  );
};

export default ProtectedRoutes;
