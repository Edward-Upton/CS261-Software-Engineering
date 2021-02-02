import { useEffect } from "react";
import { io } from "socket.io-client";

import { Button } from "@material-ui/core";

function App() {
  // const [response, setResponse] = useState("no response yet");
  // const [data, setData] = useState<string[]>([]);
  // const [count, setCount] = useState<number>(0);
  // const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // socket.on("message", (data: string) => {
    //   console.log(data);
    // });

    // socket.on("count", (data: { newCount: number }) => {
    //   console.log("new count received");
    //   setCount(data.newCount);
    // });

    // socket.on("usersUpdate", (data: { newUsers: string[] }) => {
    //   console.log("new users received");
    //   setUsers(data.newUsers);
    // });
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
      <Button variant="contained">Button</Button>
    </div>
  );
}

export default App;
