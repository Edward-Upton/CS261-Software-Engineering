import { useEffect } from "react";
import { io } from "socket.io-client";

import { User } from "../App";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  useEffect(() => {
    if (!user) return;
    const socket = io(SOCKET_URI, { auth: user });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <div>
      <h1>Host</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Host;
