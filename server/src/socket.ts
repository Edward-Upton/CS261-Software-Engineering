import { Server, Socket } from "socket.io";

import { IUser } from "./models/user";
import { IField } from "./models/event";

export const users: { [id: string]: [Socket, IUser] } = {};

// Proper way
// export const updateHosts = (host: string, data: IField["data"]): void => {
//   const [socket, user] = users[host];
//   socket.emit("data", data);
// };

export const updateHosts = (host: string, event: unknown): void => {
  console.log("HERE1");
  console.log(users);
  const [socket, user] = users[host];
  console.log("HERE2");
  socket.emit("eventUpdate", { event });
};

const socket = (io: Server): void => {
  io.on("connection", (socket: Socket) => {
    const user = socket.handshake.auth as IUser;
    users[user._id] = [socket, user];
    console.log(users);
    console.log(`${user.email} socket connected.`);

    socket.on("disconnect", () => {
      delete users[user._id];
      console.log(`${user.email} socket disconnected.`);
    });
  });
};

export default socket;
