import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Server } from "socket.io";

import { PORT, DB_URI, DB_OPTIONS } from "./config";
import userRouter from "./routes/user";
import eventRouter from "./routes/event";
import socket from "./socket";

// Connect to MongoDB database.
mongoose
  .connect(DB_URI, DB_OPTIONS)
  .then(() => console.log("Connected to database."))
  .catch((error) => console.log(error));

// Initialize express app.
const app = express();

// JSON body parser middleware.
app.use(express.json());
// HTTP logging middleware.
app.use(morgan("dev"));

// User and Event routes.
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

// Listen on the specific port.
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}.`)
);

// Initialize Socket.IO server.
// Enable Cross-Origin Resource Sharing.
const io = new Server(server, { cors: { origin: "*" } });

// Register socket handler.
socket(io);
