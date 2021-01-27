import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const ENDPOINT = "127.0.0.1"

function App() {
  const [response, setResponse] = useState("no response yet");
  const [data, setData] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Response: {response}</p>
        <p>Data: {data}</p>
        <p>Count: {count}</p>
        <ul>
          {users.map((email) => {
            return <li>{email}</li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
