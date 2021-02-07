import { useEffect } from "react";
import { io } from "socket.io-client";

import { Container, Typography } from "@material-ui/core";

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
    <Container maxWidth="xs">
      <Typography component="h1" variant="h3">
        Host
      </Typography>
      <Typography variant="body1">{user.email}</Typography>
    </Container>
  );
};

export default Host;
