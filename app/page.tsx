"use client";
import React, { use, useEffect, useState } from "react";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { socket } from "@/lib/socketClient";

export default function Home() {
  // State for room and user information
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  // number of joined users
  const [roomSize, setRoomSize] = useState(0);
  // State for joined users
  const [joinedUsers, setJoinedUsers] = useState<string[]>([]);
  // State for joined rooms and messages
  const [joinedRooms, setJoinedRooms] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    const handleJoinedUsersUpdate = (users: string[]) => {
      console.log("Received joined users update:", users);
      setJoinedUsers(users);
    };
    socket.on("joined_users_updated", handleJoinedUsersUpdate);

    return () => {
      socket.off("joined_users_updated", handleJoinedUsersUpdate);
    };
  }, []);
  console.log(joinedUsers);

  useEffect(() => {
    if (joined && room) {
      socket.emit("get_room_size", room, (size: number) => setRoomSize(size));
    }
  });

  // Handle joining a room
  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("join-room", { room, username: userName });

      // update the joinedRooms state for the current user
      setJoinedRooms((prevRooms) => {
        if (!prevRooms.includes(room)) {
          return [...prevRooms, room];
        }
        return prevRooms;
      });
    }
    setJoined(true);
  };

  // Handle sending a message
  const handleSendMessage = (message: string) => {
    const timestamp = new Date().toISOString();
    const data = { room, message, sender: userName, timestamp };
    setMessages((prev) => [...prev, { sender: userName, message, timestamp }]);
    socket.emit("message", data);
  };

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

  // Switch between room chat
  const handleRoomClick = (newRoom: string) => {
    if (newRoom !== room) {
      socket.emit("leave-room", { room, username: userName });
      socket.emit("join-room", { room: newRoom, username: userName });
      setRoom(newRoom);
      setMessages([]);
    }
  };

  return (
    <div className="flex h-screen">
      {!joined ? (
        // Join Room Form - if not joined
        <div className="w-[500px] h-[400px] bg-[#000] rounded-[5px] mx-auto mt-[80px]">
          <h1 className="text-[#fff] text-[24px] pt-[50px] font-[800] mb-[30px] text-center">
            Join a Room
          </h1>
          <form className="flex flex-col gap-y-[25px]">
            {/* username */}
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-[420px] h-[50px] bg-[#EFF3F8] rounded-[5px] text-[#000] mx-auto py-[10px] px-[20px]"
            />
            {/* room */}
            <input
              id="room"
              name="room"
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-[420px] h-[50px]  bg-[#EFF3F8] rounded-[5px] text-[#000]mb-[50px] mx-auto py-[10px] px-[20px]"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-[#1FBA4A] text-[#fff] w-[420px] h-[50px] rounded-[6px] text-center py-[14px] mx-auto"
            >
              Join Room
            </button>
          </form>
        </div>
      ) : (
        <div className="flex h-screen">
          {/* Left Sidebar: joined rooms */}
          <div className="w-[300px] bg-[#121212] text-white p-4">
            <h2 className="text-xl font-bold mb-4">Rooms you joined</h2>
            <ul className="space-y-2">
              {/* Rooms a user joined */}
              {joinedRooms.map((joinedRoom, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-lg cursor-pointer ${
                    joinedRoom === room
                      ? "bg-blue-500 text-white"
                      : "bg-[#e1e1e] hover:bg-[#2e2e2e]"
                  }`}
                  onClick={() => handleRoomClick(joinedRoom)}
                >
                  {joinedRoom}
                </li>
              ))}
            </ul>
          </div>
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col w-[936px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-[#121212] py-[18px] px-[46px] border-b-[1px] border-[#303030]">
              <div className="flex items-center gap-x-[18px]">
                <div className="w-[58px] h-[58px] rounded-[58px] border-[1px] border-[#434343]"></div>
                <div className="flex flex-col gap-y-[3px]">
                  <h1 className="text-[#F0F0F0] text-[20px] font-[500px]">
                    {userName}
                  </h1>
                  <p className="text-[#00A3FF]">Online</p>
                </div>
              </div>
              <p className="text-[#fff] text-[18px]">
                {roomSize} user{roomSize !== 1 ? "s" : ""}{" "}
                <span className="text-[#00A3FF]">online</span>
              </p>

              <p className="text-[#434343] text-[20px]">
                Room: <span className="text-[#f0f0f0] text-[18px]">{room}</span>
              </p>
            </div>
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#181818]">
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
            {/* Chat Form */}
            <div className="bg-[#121212] border-t border-[#303030]">
              <ChatForm onSendMessage={handleSendMessage} />
            </div>
          </div>

          {/* Right Sidebar: joined users */}
          <div className="bg-[#121212] w-[300px] p-4">
            <h2 className="text-xl font-bold mb-4 text-[#fff] py-[20px]">
              All Joined Users
            </h2>
            <ul className="space-y-2">
              {joinedUsers.map((user, index) => (
                <li
                  key={index}
                  className="p-2 rounded-lg bg-gray-800 text-white"
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
