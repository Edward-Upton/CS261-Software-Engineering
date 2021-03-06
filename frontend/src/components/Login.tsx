import { useState } from "react";
import axios from "axios";

import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";

import MyTextField from "./MyTextField";
import MyButton from "./MyButton";

import "./Login.css";

import { IUser } from "../types";

interface Props {
  login: (user: IUser) => void;
}

const Login: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Attempt to login
  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Login to API, if successful then login to app.
      const res = await axios.post("/api/user/login", { email, password });
      props.login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // Register a new account
  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Attempt to create a new account and then immediately login
      // if registration is successful.
      const res = await axios.post("/api/user/register", { email, password });
      props.login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="login">
      <MyTextField
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(v) => setEmail(v)}
      >
        <AiOutlineUser />
      </MyTextField>
      <MyTextField
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(v) => setPassword(v)}
      >
        <HiOutlineKey />
      </MyTextField>

      <div className="login__buttons">
        {/* Login Button */}
        <MyButton
          onClick={login}
          styled={{ backgroundColor: "#c48227", width: "45%" }}
        >
          Login
        </MyButton>

        {/* Register Button */}
        <MyButton
          onClick={register}
          styled={{ backgroundColor: "#336666", width: "45%" }}
        >
          Register
        </MyButton>
      </div>
    </form>
  );
};

export default Login;
