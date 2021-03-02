import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Tab from "./components/Tab";

import "./App.css";

import { IUser } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: IUser) => {
    setUser(user);
    // Store the user's login info into cookies.
    localStorage.setItem("userId", user._id);
  };

  const logout = () => {
    setUser(null);
    // Remove the user's login info from cookies.
    localStorage.removeItem("userId");
  };

  // Run on first render.
  useEffect(() => {
    // Get the user's info from cookies and store it as a state.
    const userId = localStorage.getItem("userId");
    if (userId)
      (async () => {
        const response = await axios.get(`/api/user/${userId}`);
        login(response.data.user);
      })();
  }, []);

  return (
    <div id="wrapper">
      <div>
        {user ? (
          // If user is logged in, render the header showing the user's email and logout
          // button and and the "participate" and "host" tabs.
          <>
            <Header email={user.email} logout={logout} />
            <Tab user={user} />
          </>
        ) : (
          // If user not logged in, render the login screen
          <Login login={login} />
        )}
      </div>
    </div>
  );
};

export default App;
