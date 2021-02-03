import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Button } from "@material-ui/core";

const ENDPOINT = "127.0.0.1:3000"

function App() {
  const [response, setResponse] = useState("no response yet");
  const [data, setData] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket']})

    socket.on("message", (data: string) => {
      console.log(data)
    });

    socket.on("count", (data: { newCount: number }) => {
      console.log("new count received")
      setCount(data.newCount)
    })

    socket.on("usersUpdate", (data: { newUsers: string[] }) => {
      console.log("new users received");
      setUsers(data.newUsers);
    })
  }, [])

  return (
    <div className="App">
      <h1>App</h1>
      <Button variant="contained">Button</Button>
    </div>
  );
}

export default App;
