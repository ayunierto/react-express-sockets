import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    const recivedMenssage = (message) => {
      console.log(message);
    };
    socket.on("message", recivedMenssage);

    return () => {
      socket.off("message", recivedMenssage);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} value={message}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
