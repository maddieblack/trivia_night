"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useSocketListener } from "@/components/hooks/useSocket";
import { useContext } from "react";
import { GameContext } from "@/context/GameProvider";

export const HomePage = () => {
  const router = useRouter();
  const { createGame } = useContext(GameContext);

  useSocketListener("game:create:success", (payload) => {
    router.push(`/lobby/${payload.game.room_code}`);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 tv:gap-10 ">
      <h1 className="font-gyparody text-white text-7xl md:text-8xl tv:text-[12rem]">
        JEOPARDY!
      </h1>
      <Button
        className="bg-amber-400 hidden md:block "
        onClick={() => createGame()}
      >
        NEW GAME
      </Button>
      <Button className="bg-amber-400" onClick={() => router.push("/player")}>
        JOIN GAME
      </Button>
    </div>
  );
};

export default HomePage;
