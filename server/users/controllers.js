import User from "./models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register a new user

export const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne(email);
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    //hash the password

    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne(email);
    if (!userExist)
      return res.status(400).json({ message: "User does not exists" });

    //compare password
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (validPassword) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }

    //  create and assign a token
    const token = jwt.sign({ userId: userExist._id }, process.env.TOKEN_SECRET);
    res.send({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "email or password incorrect",
      error: error.message,
    });
  }
};
