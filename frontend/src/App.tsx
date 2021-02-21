import { useState, useEffect } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import Tab from "./components/Tab";

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
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "none",
      }}
    >
      <Header email={user.email} logout={logout} />
      <Tab user={user}></Tab>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "none",
      }}
    >
      <Login login={login} />
    </div>
  );
};

export default App;
