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

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: {
      origin: "https://chat-app-delta-jet.vercel.app",
      methods: ["GET", "POST"],
    },
  });
  // allowedHeaders: ["Content-Type"],
  // credentials: true,

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-room", ({ room, username }) => {
      const joinTime = new Date();

      // Format the join time to "HH:MM:SS | DD/MM/YYYY"
      const formattedJoinTime =
        joinTime.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) +
        " | " +
        joinTime.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

      socket.join(room);
      socket.data = { room, username, joinTime: formattedJoinTime };
      console.log(
        `User ${username} joined room ${room} at ${formattedJoinTime}`
      );

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
          `User "${username}" joined the room "${room}" at ${formattedJoinTime}`
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
