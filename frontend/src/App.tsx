import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Participate from "./components/Participate";
import Host from "./components/Host";

import "./App.css";

import { IUser } from "./types";

const App: React.FC = () => {
  // User state
  const [user, setUser] = useState<IUser | null>(null);

  // Tab boolean, true for host, false for participate.
  const [tab, setTab] = useState<boolean>(false);

  // Login method
  const login = (user: IUser) => {
    setUser(user);
    // Store userId in the browser local storage.
    localStorage.setItem("userId", user._id);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    // Store userId in the browser local storage.
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    // Check if userId in local storage.
    const userId = localStorage.getItem("userId");
    // Retrieve user from API and login, if failed, logout.
    if (userId)
      (async () => {
        try {
          const response = await axios.get(`/api/user/${userId}`);
          login(response.data.user);
        } catch (error) {
          logout();
        }
      })();
  }, []);

  // If user is logged in, show the header and host or participate tabs.
  // Otherwise, show the login component.
  return (
    <div id="wrapper">
      <div>
        {user ? (
          <>
            <Header user={user} logout={logout} tab={tab} setTab={setTab} />
            {tab ? <Host user={user} /> : <Participate user={user} />}
          </>
        ) : (
          <Login login={login} />
        )}
      </div>
    </div>
  );
};

export default App;
