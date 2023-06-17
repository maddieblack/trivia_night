"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input/Input";
import { GameContext } from "@/context/GameProvider";

export const HomePage = () => {
  const { setGame } = useContext(GameContext);
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("game:create:success", (payload) => {
      setGame(payload);
      router.push("/game");
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-gyparody text-white text-7xl md:text-8xl ">
        JEOPARDY!
      </h1>
      <Button
        className="bg-amber-400 hidden md:block"
        onClick={() => socket.emit("game:create")}
      >
        START GAME
      </Button>
      {/*<div className="flex md:hidden flex-col items-center gap-4">*/}
      {/*  <Input*/}
      {/*      value={roomCode}*/}
      {/*      onChange={(e) => setRoomCode(e.target.value)}*/}
      {/*      placeholder="ENTER GAME CODE"*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*      className="bg-amber-400"*/}
      {/*      onClick={() => socket.emit("JOIN_GAME", { roomCode })}*/}
      {/*  >*/}
      {/*    JOIN GAME*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default HomePage;
