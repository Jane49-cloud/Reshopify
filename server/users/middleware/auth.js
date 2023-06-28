import Jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
