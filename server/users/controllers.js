import User from "./models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("User already exists");
      return res.send({
        success: false,
        message: "user with that email already already exist",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const user = await newUser.save();
    res.send({
      user: user,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.send({ success: false, message: "User does not exist" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.send({
        success: false,
        message: "email or password incorrect",
      });
    }

    // Create and assign a token
    const token = jwt.sign(
      { userId: userExist._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.send({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "email or password incorrect",
      error: error.message,
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "data fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
    console.log(error, users);
  }
};

//update status

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await User.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Status updated successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
