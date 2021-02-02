import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import socketio, { Socket } from "socket.io";

import userRouter from "./routes/user";

dotenv.config();

const PORT = process.env.PORT || 5000;

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

const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}.`)
);

const IO_OPTIONS = {
  cors: { origin: "http://localhost:3000" },
};

const io = new socketio.Server(server, IO_OPTIONS);

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => res.status(200).json({ message: "GET /" }));

io.on("connection", (socket: Socket) => {
  console.log("Socket connected.");
  socket.on("disconnect", () => {
    console.log("Socket disconnected.");
  });
});
