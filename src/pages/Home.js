"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { socket } from "@/services/socket.js";

export const Home = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

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
      <h1 className="font-gyparody text-white text-8xl">JEOPARDY!</h1>
      <Button className="bg-amber-400" onClick={() => socket.emit("test")}>
        START GAME
      </Button>
    </div>
  );
};
