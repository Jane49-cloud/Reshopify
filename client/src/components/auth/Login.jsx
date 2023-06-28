import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../../apicalls/user.actions";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        toast.error(response.message);
      }
      console.log(response.message); // Log the message property
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen  flex justify-center items-center bg-gray-50 shadow">
      <div className="bg-white w-[450px] rounded">
        <div
          className="h-[60px] bg-secondary-800 flex justify-center items-center "
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          <h1 className="text-center text-gray-50">𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆 - Login</h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col p-3">
          <TextField
            label="Email"
            name="email"
            className="rounded mt-2"
            value={formData.email}
            onChange={handleInputChange}
          />
          <br />
          <TextField
            label="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded mt-2"
          />
          <br />
          <button
            className="bg-secondary-800 text-gray-20 h-[35px] rounded "
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Forgot password?{" "}
            <Link to={"#"} className="text-primary-links underline">
              Reset Password{" "}
            </Link>
          </p>
          <p className="mt-4 text-center">
            Do not have an account?{" "}
            <Link to={"/register"} className="text-primary-links underline">
              Register{" "}
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
