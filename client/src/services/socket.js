import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";

export const socket = io(URL, { withCredentials: true });

socket.onAny((event, args) => {
  console.log("EVENT:", event, args);
});
