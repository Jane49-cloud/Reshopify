import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../apicalls/user.actions";

const RegisterForm = () => {
  const Register = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
      }
      return response.data;
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center bg-gray-50  shadow">
      <div className="bg-white w-[450px] rounded">
        <div
          className="h-[60px] bg-secondary-800 flex justify-center items-center "
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          <h1 className="text-center text-gray-50">𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆 - Register</h1>
        </div>
        <form onSubmit={Register} className="flex flex-col p-3">
          <TextField label="First Name" name="firstName" /> <br />
          <TextField
            label="Last Name"
            name="LastName"
            className="rounded mt-2"
          />
          <br />
          <TextField label="Email" name="email" className="rounded mt-2" />
          <br />
          <TextField
            label="password"
            name="password"
            type="password"
            className="rounded mt-2"
          />
          <br />
          <button className="bg-secondary-800 text-gray-20 h-[35px] rounded ">
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary-links underline">
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
