"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { Button } from "@/components/Button";
import { GameContext } from "@/context/GameProvider";

export const HomePage = () => {
  const { updateGame } = useContext(GameContext);
  const router = useRouter();

  useEffect(() => {
    socket.on("game:create:success", (payload) => {
      updateGame(payload);
      router.push("/game");
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-gyparody text-white text-7xl md:text-8xl ">
        JEOPARDY!
      </h1>
      <div className="flex flex-col items-center gap-5">
        <Button
          className="bg-amber-400 hidden md:block"
          onClick={() => socket.emit("game:create")}
        >
          START GAME
        </Button>
        <Button className="bg-amber-400" onClick={() => router.push("/player")}>
          JOIN GAME
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
