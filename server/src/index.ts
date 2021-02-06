import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Server } from "socket.io";

import { PORT, DB_URI, DB_OPTIONS } from "./config";
import userRouter from "./routes/user";
import eventRouter from "./routes/event";
import socket from "./socket";

mongoose
  .connect(DB_URI, DB_OPTIONS)
  .then(() => console.log("Connected to database."))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

app.get("/", (req, res) => res.status(200).json({ message: "GET /" }));

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}.`)
);

const io = new Server(server, { cors: { origin: "*" } });
socket(io);
