import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const DB_URI = process.env.MONGODB_URI!;
const DB_OPTIONS = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(DB_URI, DB_OPTIONS)
  .then(() => console.log("Connected to database."))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => res.status(200).json({ message: "GET /" }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
