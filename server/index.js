import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const PORT =  5000;
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);

const uri = 'mongodb://localhost:27017/gentleweb?readPreference=primary&ssl=false'

mongoose
  .connect(uri)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
