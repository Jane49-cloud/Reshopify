import express from "express";
import connection from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./users/routes.js";
import productRouter from "./products/routes.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

connection();
