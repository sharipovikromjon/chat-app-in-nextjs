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
      setJoinedUsers(users);
    };
    socket.on("joined_users_updated", handleJoinedUsersUpdate);

    return () => {
      socket.off("joined_users_updated", handleJoinedUsersUpdate);
    };
  }, []);

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
  console.log(joinedRooms);

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
          <div className="w-[300px] bg-[#fff] text-white p-4">
            <h2 className="text-[24px] font-[600] leading-[36px] text-[#000929] py-[20px] mb-[10px]">
              Rooms you joined
            </h2>
            <ul className="flex flex-col gap-y-[8px]">
              {/* Rooms a user joined */}
              {joinedRooms.map((joinedRoom, index) => (
                <li
                  key={index}
                  className={`p-[20px] flex items-center gap-x-[40px] rounded-[4px] ${
                    joinedRoom === room ? "bg-[#000929]" : "bg-amber-50"
                  }`}
                  onClick={() => handleRoomClick(joinedRoom)}
                >
                  <img
                    src="/images/white-door.png"
                    alt="Door Icon"
                    className="w-[24px] h-[24px] cursor-pointer"
                    onClick={() => handleRoomClick(joinedRoom)}
                  />

                  <p
                    className={`text-[16px] font-[400] leading-[24px] ${
                      joinedRoom === room ? "text-[#F7F7FD]" : "text-[#7B7F9E]"
                    }`}
                  >
                    {joinedRoom}
                  </p>
                </li>
              ))}
              <li
                className={`p-[20px] flex items-center gap-x-[40px] rounded-[4px] bg-[#f5f5f5]`}
              >
                <img
                  src="/images/black-door.png"
                  alt="Door Icon"
                  className="w-[24px] h-[24px] cursor-pointer"
                />

                <p
                  className={`text-[#7B7F9E] text-[16px] font-[400] leading-[24px]`}
                >
                  room-name
                </p>
              </li>
            </ul>
          </div>
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col w-[936px] border-l-[1px] border-r-[1px] border-[#434343]">
            {/* Chat Header</div> */}
            <div className="flex items-center justify-between bg-[#fff] py-[18px] px-[46px] border-b-[1px] border-[#303030]">
              <div className="flex items-center gap-x-[18px]">
                <img
                  src="/images/user-icon.png"
                  alt="user avatar"
                  className="w-[58px] h-[58px] rounded-full border-[1px] border-[#434343]"
                />
                <div className="flex flex-col">
                  <h1 className="text-[#000929] ml-[5px] text-[18px] tracking-[1px] font-[600px] leading-[24px] mb-[8px]">
                    {userName}{" "}
                    {userName === "Ikromjon" ? (
                      <span className="text-[#BABABA] text-[14px] font-[500] ">
                        (owner)
                      </span>
                    ) : (
                      <span className="text-[#BABABA] ">(user)</span>
                    )}
                  </h1>
                  <div className="flex items-center">
                    <img src="/online-icon.svg" alt="icon" />
                    <p className="text-[#BABABA] text-[14px] font-[500]">
                      Online
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[#434343] text-[20px]">
                Room: <span className="text-[#969696] text-[18px]">{room}</span>
              </p>
            </div>
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#fff]">
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
            <div className="bg-[#fff] border-t border-[#303030]">
              <ChatForm onSendMessage={handleSendMessage} />
            </div>
          </div>

          {/* Right Sidebar: joined users */}
          <div className="bg-[#fff] w-[300px] p-4">
            <div className="flex items-center gap-x-[50px]">
              <div className="group relative inline-block">
                <h2 className="text-[24px] font-[600] leading-[36px] text-[#000929] py-[20px] mb-[10px] cursor-help">
                  Total: 4
                </h2>
                {/* Tooltip text */}
                <span className="absolute bottom-[0%] left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-md z-10 whitespace-nowrap">
                  not dynamic count
                </span>
              </div>
              <div className="relative inline-block group">
                <h2 className="text-[#76767C] text-[24px] font-[600] leading-[36px] py-[20px] mb-[10px] cursor-help">
                  <span className="text-[#0CAF60]">online: </span>
                  {roomSize}
                </h2>
                {/* Tooltip text */}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-md z-10 whitespace-nowrap">
                  {`${roomSize} user${roomSize !== 1 ? "s" : ""} online`}
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-y-[8px]">
              {joinedUsers.map((user, index) => (
                <li
                  key={index}
                  className="flex gap-x-[12px] py-[10px] px-[20px] bg-[#F7F7FD] rounded-[10px] border-[0.3px] solid"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user}&background=random`}
                    alt={`${user}'s avatar`}
                    className="w-[40px] h-[40px] rounded-full mr-[10px]"
                  />
                  <p className="text-[#000929] text-[14px] font-[500] leading-[21px]">
                    {user}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
