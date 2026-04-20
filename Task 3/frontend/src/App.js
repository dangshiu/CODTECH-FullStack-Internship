import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load-document", (data) => {
      setText(data);
    });

    socket.on("receive-changes", (data) => {
      setText(data);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    socket.emit("send-changes", value);
  };

  return (
    <div className="container">
      <h1>Collaborative Editor</h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;