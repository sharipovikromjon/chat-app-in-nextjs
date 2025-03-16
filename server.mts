import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import { join } from "path";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join-room", ({ room, username }) => {
      const joinTime = new Date();
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
      socket
        .to(room)
        .emit(
          "user_joined",
          `User "${username}" joined the room "${room}" at ${formattedJoinTime}`
        );
    });
    // `${username} joined the room ${room}`

    socket.on("message", ({ room, message, sender, timestamp }) => {
      console.log(
        `Message from sender ${sender} in room ${room} at ${timestamp}: ${message}`
      );
      socket.to(room).emit("message", { sender, message, timestamp });
    });

    // socket.on("disconnect", () => {
    //   const { room, username } = socket.data;
    //   socket.disconnect(room);
    //   console.log(
    //     `User ${username} disconnected from the room ${room}: ${socket.id}`
    //   );
    //   socket
    //     .to(room)
    //     .emit("disconnect", `User ${username} left the room ${room}`);
    // });
  });

  // io.off("disconnect", (socket) => {
  //   const { room, username } = socket.data;
  //   console.log(`User disconnected: ${socket.id}`);
  //   socket.disconnect(room);
  //   socket
  //     .to(room)
  //     .emit("disconnect", `User ${username} left the room ${room}`);
  // });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
