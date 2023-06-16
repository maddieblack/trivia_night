import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(bodyParser.json());

io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    const rooms = io.of("/").adapter.rooms;
    const sids = io.of("/").adapter.sids;
    console.log({ rooms, sids, args });
  });

  socket.on("NEW_GAME", (args) => {
    const roomName = "TEST1234";
    socket.join(roomName);
  });
});

io.of("/").adapter.on("create-room", (room) =>
  console.log(`room ${room} was created`)
);

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
