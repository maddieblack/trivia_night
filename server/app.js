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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log(`got ${event}`);
  });
});

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
