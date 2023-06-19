import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import handlers from "./handlers/index.js";
import dotenv from "dotenv";
import { registerHandlers } from "./utils/registerHandlers.js";

dotenv.config();

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

mongoose.connect(process.env.DB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("MongoDB connected successfully");
});

io.on("connection", (socket) => {
  socket.onAny((args) => console.log("EVENT:", args));
  registerHandlers(handlers, socket, io);
});

io.of("/").adapter.on("create-room", (room) =>
  console.log(`room ${room} was created`)
);

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

io.of("/").adapter.on("leave-room", (room, id) => {
  console.log(`socket ${id} has left room ${room}`);
});

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
