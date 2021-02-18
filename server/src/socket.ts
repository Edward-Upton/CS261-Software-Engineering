import { Server, Socket } from "socket.io";
import { IUser } from "./models/user";

export default function (io: Server): void {
  io.on("connection", (socket: Socket) => {
    const user = socket.handshake.auth as IUser;
    console.log(`${user.email} socket connected.`);
    socket.on("email", () => {
      console.log("HELLO");
    })

    socket.on("disconnect", () => {
      console.log(`${user.email} socket disconnected.`);
    });
  });
}
