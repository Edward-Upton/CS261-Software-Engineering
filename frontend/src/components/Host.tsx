import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { Container, Typography } from "@material-ui/core";

import { User } from "../App";

const SOCKET_URI = "ws://localhost:5000";

interface Props {
  user: User;
}

const Host: React.FC<Props> = ({ user }) => {
  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    if (!user) return;
    socket.current = io(SOCKET_URI, { auth: user });
    return () => {
      socket.current?.disconnect();
    };
  }, [user]);

  const socketTest = () => {
    socket.current?.emit("email");
  };

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
