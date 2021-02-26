import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Tab from "./components/Tab";
import EventParticipant from "./components/EventParticipant";
import { User, IEvent } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [eventParticipantOpen, setEventParticipantOpen] = useState<boolean>(
    false
  );
  const [
    eventParticipantEvent,
    setEventParticipantEvent,
  ] = useState<IEvent | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("userId", user._id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId)
      (async () => {
        const response = await axios.get(`/api/user/${userId}`);
        login(response.data.user);
      })();
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
      {!eventParticipantOpen && (
        <>
          <Header email={user.email} logout={logout} />
          <Tab
            user={user}
            setEventParticipantOpen={() => setEventParticipantOpen(true)}
            setEventParticipantEvent={(event) =>
              setEventParticipantEvent(event)
            }
          />
        </>
      )}
      {eventParticipantOpen && (
        <EventParticipant
          user={user}
          event={eventParticipantEvent}
          closeClicked={() => setEventParticipantOpen(false)}
        />
      )}
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
