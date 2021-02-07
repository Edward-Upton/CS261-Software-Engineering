import { useState } from "react";
import axios from "axios";

import { Button, Container, TextField, Typography } from "@material-ui/core";

import { User } from "../App";

interface Props {
  login: (user: User) => void;
}

const Login: React.FC<Props> = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/user/login", { email, password });
      login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      const res = await axios.post("/api/user/register", { email, password });
      login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h3">
        Login
      </Typography>
      <form onSubmit={submit}>
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Login
        </Button>
        <Button
          onClick={register}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Login;
