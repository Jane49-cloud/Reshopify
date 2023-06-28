import { useState, useEffect } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../apicalls/user.actions";
import {
  Avatar,
  IconButton,
  MenuItem,
  Typography,
  FormControl,
  Select,
  InputBase,
} from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";

const ProtectedRoutes = ({ children }) => {
  const [user, setUser] = useState(null);

  const validateToken = async () => {
    try {
      const response = await getUser();
      if (response.success) {
        setUser(response.data);
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-5 bg-gray-100 text-white">
          <Typography variant="h6" component="div">
            <strong className="text-secondary-800 shadow-sm text-2xl">
              𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆
            </strong>
          </Typography>
          <div className="flex items-center">
            {/* User Profile */}
            <div className="mr-3">
              <IconButton style={{ color: "#991b1b", backgroundColor: "#eee" }}>
                <NotificationsActive />
              </IconButton>
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
                  <MenuItem value={user.firstName}>
                    <Typography className="uppercase">
                      {user.firstName}
                    </Typography>
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
      </div>
    )
  );
};

export default ProtectedRoutes;
