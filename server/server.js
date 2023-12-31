import express from "express";
import connection from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./users/routes.js";
import productRouter from "./products/routes.js";
import ImageRouter from "./products/controller.js";
import BidRoutes from "./Bids/routes.js";
import NotificationRouter from "./notifications/routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/products", ImageRouter);
app.use("/bids", BidRoutes);
app.use("/notifications", NotificationRouter);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

connection();
