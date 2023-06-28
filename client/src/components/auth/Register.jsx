import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../apicalls/user.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
      // return response.data;
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
    <div className="h-screen flex justify-center items-center bg-gray-50 shadow">
      <div className="bg-white w-[450px] rounded">
        <div
          className="h-[60px] bg-secondary-800 flex justify-center items-center"
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          <h1 className="text-center text-gray-50">𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆 - Register</h1>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col p-3">
          <br />{" "}
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <br />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="rounded mt-2"
            required
          />
          <br />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded mt-2"
            required
          />
          <br />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded mt-2"
            required
          />
          <br />
          <button
            className="bg-secondary-800 text-gray-20 h-[35px] rounded "
            type="submit"
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-links underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
