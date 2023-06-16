"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";
import { socket } from "../services/socket.js";
import { Input } from "../components/Input/Input";

export const Home = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-gyparody text-white text-7xl md:text-8xl ">
        JEOPARDY!
      </h1>
      <Button
        className="bg-amber-400 hidden md:block"
        onClick={() => socket.emit("NEW_GAME", { foo: "bar" })}
      >
        START GAME
      </Button>
      <div className="flex md:hidden flex-col items-center gap-4">
        <Input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="ENTER GAME CODE"
        />
        <Button
          className="bg-amber-400"
          onClick={() => socket.emit("JOIN_GAME", { roomCode })}
        >
          JOIN GAME
        </Button>
      </div>
    </div>
  );
};
