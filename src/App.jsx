import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
const socket = io.connect("http://localhost:3001");
export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    return;
  };
  return (
    <div>
      <h3>Join chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room Id"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join a room</button>
      <h3>Live chat</h3>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}
