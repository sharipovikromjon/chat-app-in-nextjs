"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { socket } from "@/lib/socketClient";

export default function Home() {
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && room) {
      socket.emit("join-room", { room, username: userName });
      setJoined(true);
    }
  };

  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);
  const [userName, setUserName] = useState("");

  // Option 1
  useEffect(() => {
    socket.on("message_history", (data) => {
      setMessages(data);
    });
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      const timestamp = new Date().toLocaleString();
      setMessages((prev) => [
        ...prev,
        { sender: "system", message: `${message}`, timestamp },
      ]);
    });

    return () => {
      socket.off("message_history");
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  /* Option 2 */
  /*useEffect(() => {
    socket.on("user_joined", ({ userName, room, joinTime }) => {
      setMessages((prev) => [
        ...prev,
        { sender: "system", message: `User ${userName} joined the room ${room} at ${joinTime}`, timestamp: joinTime },
      ]);
    });
    return () => {
      socket.off("user_joined");
    };
  }, []);*/

  const handleSendMessage = (message: string) => {
    const timestamp = new Date().toLocaleString();
    const data = { room, message, sender: userName, timestamp };
    setMessages((prev) => [...prev, { sender: userName, message, timestamp }]);
    socket.emit("message", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      {!joined ? (
        <div className="flex w-full max-w-3xl mx-auto flex-col items-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
          {/* username */}
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-64 px-4 py-2 mb-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* room */}
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-64 px-4 py-2 mb-5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2  bg-[#00A3FF] text-white rounded-lg hover:bg-black transition linear duration-400"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-[20px]">
            <h1 className="mb-4 font-bold text-[32px] text-center">
              User: <span className="text-white">{userName}</span>
            </h1>
            <h1 className="mb-4 font-bold text-[32px] text-center">
              Room: <span className="text-white">{room}</span>
            </h1>
          </div>
          <div
            className="h-[500px]
           overflow-y-auto p-4 mb-4 bg-[#181818] border-2 rounded-lg"
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
                timestamp={msg.timestamp}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
