import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

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
      socket.join(room);
      socket.data = { room, username };
      console.log(`User ${username} joined room ${room}`);
      socket
        .to(room)
        .emit("user_joined", `${username} joined the room ${room}`);
    });

    socket.on("message", ({ room, message, sender }) => {
      console.log(`Message from sender ${sender} in room ${room}: ${message}`);
      socket.to(room).emit("message", { sender, message });
    });

    socket.on("disconnect", () => {
      const { room, username } = socket.data;
      socket.disconnect(room);
      console.log(
        `User ${username} disconnected from the room ${room}: ${socket.id}`
      );
      socket
        .to(room)
        .emit("disconnect", `User ${username} left the room ${room}`);
    });
  });

  io.off("disconnect", (socket) => {
    const { room, username } = socket.data;
    console.log(`User disconnected: ${socket.id}`);
    socket.disconnect(room);
    socket
      .to(room)
      .emit("disconnect", `User ${username} left the room ${room}`);
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
