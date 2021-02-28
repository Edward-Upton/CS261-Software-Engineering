import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Tab from "./components/Tab";
import EventParticipant from "./components/EventParticipant";
import EventHost from "./components/EventHost";

import "./App.css";

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
  const [eventHostOpen, setEventHostOpen] = useState<boolean>(false);
  const [eventHostEvent, setEventHostEvent] = useState<IEvent | null>(null);

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

  return (
    <div id="wrapper">
      {user ? (
        eventParticipantOpen || eventHostOpen ? (
          eventParticipantOpen ? (
            <EventParticipant
              user={user}
              event={eventParticipantEvent}
              closeClicked={() => setEventParticipantOpen(false)}
            />
          ) : (
            <EventHost
              user={user}
              event={eventHostEvent}
              closeClicked={() => setEventHostOpen(false)}
              setEventHostEvent={(event) => setEventHostEvent(event)}
            />
          )
        ) : (
          <>
            <Header email={user.email} logout={logout} />
            <Tab
              user={user}
              setEventParticipantOpen={() => setEventParticipantOpen(true)}
              setEventParticipantEvent={(event) =>
                setEventParticipantEvent(event)
              }
              setEventHostOpen={() => setEventHostOpen(true)}
              setEventHostEvent={(event) => setEventHostEvent(event)}
            />
          </>
        )
      ) : (
        <Login login={login} />
      )}
    </div>
  );
};

export default App;
