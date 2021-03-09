import { Server, Socket } from "socket.io";

import { IUser } from "./models/user";
import { IField } from "./models/event";

/** Current connected users. */
export const users: { [id: string]: [Socket, IUser] } = {};

/**
 * Update a host with event data.
 * @param host Host user id.
 * @param event Event data to be sent.
 */
// export const updateHosts = (host: string, data: IField["data"]): void => {
export const updateHost = (host: string, event: unknown): void => {
  const [socket, user] = users[host];
  socket.emit("eventUpdate", { event });
};

/**
 * Register socket events.
 * @param io Socket.IO server.
 */
const socket = (io: Server): void => {
  io.on("connection", (socket: Socket) => {
    const user = socket.handshake.auth as IUser;
    users[user._id] = [socket, user];
    console.log(`${user.email} socket connected.`);

    socket.on("disconnect", () => {
      delete users[user._id];
      console.log(`${user.email} socket disconnected.`);
    });
  });
};

export default socket;
