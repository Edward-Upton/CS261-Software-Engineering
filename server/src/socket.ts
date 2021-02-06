import { Server, Socket } from "socket.io";

export default function (io: Server): void {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected.");

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });
  });
}
