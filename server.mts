import { hasCORS } from './node_modules/engine.io-client/build/esm-debug/contrib/has-cors';
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

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
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

});







