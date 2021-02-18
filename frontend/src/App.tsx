import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";

import Login from "./components/Login";
import Host from "./components/Host";
import Participant from "./components/Participant";
import Header from "./components/Header";

export interface User {
  _id: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("_id", user._id);
    localStorage.setItem("email", user.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("_id");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    const email = localStorage.getItem("email");
    if (_id && email) setUser({ _id, email });
  }, []);

  return user ? (
    <>
      <Header email={user.email} logout={logout}></Header>
      <Host user={user} />
      <Participant user={user} />
    </>
  ) : (
    <>
      <Login login={login} />
    </>
  );
};

export default App;
