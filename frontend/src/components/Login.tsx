import { useState } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";

import MyTextField from "./MyTextField";

import { IUser } from "../types";
import "./Login.css";
import MyButton from "./MyButton";

interface Props {
  login: (user: IUser) => void;
}

const Login: React.FC<Props> = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Attempt to login
  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    try {
      // Attempt to login with entered email and password.
      const res = await axios.post("/api/user/login", { email, password });
      login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // Register a new account
  const register = async () => {
    try {
      // Attempt to create a new account and then immediately login
      // if registration is successful.
      const res = await axios.post("/api/user/register", { email, password });
      login(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login">
      {/* Email */}
      <MyTextField
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(v) => setEmail(v)}
        styled={{}}
      >
        <AiOutlineUser />
      </MyTextField>

      {/* Password */}
      <MyTextField
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(v) => setPassword(v)}
        styled={{}}
      >
        <HiOutlineKey />
      </MyTextField>

      <div className="login__buttons">
        {/* Login Button */}
        <MyButton
          onClick={submit}
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
    </div>
  );
};

export default Login;
