import { Server, Socket } from "socket.io";
import { IUser } from "./models/user";

export const clients: {[id: string] : {socketId: string, user: IUser}} = {};

export default function (io: Server): void {
  io.on("connection", (socket: Socket) => {
    const user = socket.handshake.auth as IUser;
    clients[user._id] = {socketId: socket.id, user: user} 
    console.log(`${user.email} socket connected.`);
    socket.on("test", () => {
      console.log("Test Message Received");
    })

    socket.on("disconnect", () => {
      delete clients[user._id];
      console.log(`${user.email} socket disconnected.`);
    });
  });
}
