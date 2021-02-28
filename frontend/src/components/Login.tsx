import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";

import MyTextField from "./MyTextField";

import { User } from "../types";
import "./Login.css";
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
    <div
      style={{
        height: "15rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <MyTextField
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(v) => setEmail(v)}
        styled={{}}
      >
        <AiOutlineUser />
      </MyTextField>
      <MyTextField
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(v) => setPassword(v)}
        styled={{}}
      >
        <HiOutlineKey />
      </MyTextField>
      <MyButton
        text="Login"
        onClick={submit}
        styled={{ backgroundColor: "#59c9a5" }}
      ></MyButton>
      <MyButton text="Register" onClick={register} styled={{}}></MyButton>
    </div>
  );
};

export default Login;
