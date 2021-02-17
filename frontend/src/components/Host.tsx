import { useEffect } from "react";
import { io } from "socket.io-client";

import { Container, Typography } from "@material-ui/core";

import { User } from "../App";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  var socket: any;
  useEffect(() => {
    if (!user) return;
    socket = io(SOCKET_URI, { auth: user });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const socketTest = () => {
    socket.emit("email");
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h3">
        Host
        <button onClick={socketTest}>Test</button>
      </Typography>
      <Typography variant="body1">{user.email}</Typography>
    </Container>
  );
};

export default Host;
