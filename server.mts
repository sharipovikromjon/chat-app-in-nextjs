import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const messageHistory: {
  [key: string]: { sender: string; message: string; timestamp: string }[];
} = {};

const roomUsers: { [key: string]: Set<string> } = {};

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: {
      origin: "https://chat-app-mrno.onrender.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-room", ({ room, username }) => {
      if (!roomUsers[room]) {
        roomUsers[room] = new Set();
      }
      roomUsers[room].add(username);
      const roomSize = roomUsers[room].size;
      io.to(room).emit("room_size_updated", roomSize);
      io.to(room).emit("joined_users_updated", Array.from(roomUsers[room]));
      socket.emit("joined_users_updated", Array.from(roomUsers[room]));
      socket.join(room);
      const joinTime = new Date();
      // Format the join time to "HH:MM:SS | DD/MM/YYYY"
      const formattedJoinTime =
        joinTime.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).toUpperCase()

      socket.data = { room, username, joinTime: formattedJoinTime };
      socket.on("get_room_size", (room, callback) => {
        const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;
        callback(roomSize);
      });

      // Send message history to the new user
      if (messageHistory[room]) {
        socket.emit("message_history", messageHistory[room]);
      } else {
        messageHistory[room] = [];
      }

      socket
        .to(room)
        .emit(
          "user_joined",
          `${username} joined at ${formattedJoinTime}`
        );
    });

    socket.on("message", ({ room, message, sender, timestamp }) => {
      console.log(
        `Message from sender ${sender} in room ${room} at ${timestamp}: ${message}`
      );
      const newMessage = { sender, message, timestamp };
      messageHistory[room].push(newMessage);
      socket.to(room).emit("message", newMessage);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
