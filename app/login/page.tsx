// import { useState } from "react";
// import {socket} from "@/lib/socketClient";
export default function Login() {
  // const [room, setRoom] = useState("");
  // const [userName, setUsername] = useState("");
  // const [joined, setJoined] = useState(false);

  // // Handle joining a room
  // const handleJoinRoom = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (userName && room) {
  //     socket.emit("join-room", {room, username: userName});
  //     setJoined(true);
  //     setJoinedRooms((previous) => [...new Set([...previous, room])])
  //   }
  // }

  // ----------------------------------------------------
  return (
    <div className="w-[500px] h-[400px] bg-[#000] rounded-[5px] mx-auto mt-[80px]">
      <h2 className="text-[#fff] text-[24px] pt-[50px] font-[800] mb-[30px] text-center">
        Login
      </h2>
      <form className="flex flex-col gap-y-[25px]">
        <input
          className="w-[420px] h-[50px] bg-[#EFF3F8] rounded-[5px] text-[#000] mx-auto py-[10px] px-[20px]"
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          // value={userName}

        />
        <input
          className="w-[420px] h-[50px]  bg-[#EFF3F8] rounded-[5px] text-[#000]mb-[50px] mx-auto py-[10px] px-[20px]"
          type="text"
          placeholder="Room-name"
        />
        <button className="bg-[#1FBA4A] text-[#fff] w-[420px] h-[50px] rounded-[6px] text-center py-[14px] mx-auto">
          Login
        </button>
      </form>
    </div>
  );
}
