import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="h-screen  flex justify-center items-center bg-gray-50 shadow">
      <div className="bg-white w-[450px] rounded">
        <div
          className="h-[60px] bg-secondary-800 flex justify-center items-center "
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          <h1 className="text-center text-gray-50">𝗥𝗲𝘀𝗵𝗼𝗽𝗶𝗳𝘆 - Login</h1>
        </div>
        <form action="" className="flex flex-col p-3">
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
    </div>
  );
};

export default LoginForm;
