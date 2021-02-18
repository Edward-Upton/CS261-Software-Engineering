import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";

import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import MyTextField from "./MyTextField";

import { User } from "../App";
import "./Login.css";
import { IconContext } from "react-icons";
import MyButton from "./MyButton";

interface Props {
  login: (user: User) => void;
}

const Login: React.FC<Props> = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    console.log("HERE");
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
    <div>
      <MyTextField
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(v) => setEmail(v)}
        styled={{ margin: 5 }}
      >
        <AiOutlineUser />
      </MyTextField>
      <MyTextField
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(v) => setPassword(v)}
        styled={{ margin: 5 }}
      >
        <HiOutlineKey />
      </MyTextField>
      <MyButton text="Login" onClick={submit} styled={{ margin: 5, backgroundColor: "#59c9a5" }}></MyButton>
      <MyButton
        text="Register"
        onClick={register}
        styled={{ margin: 5 }}
      ></MyButton>
    </div>
  );
};

export default Login;
