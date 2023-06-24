"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "@/components/Button";
import { GameContext } from "@/context/GameProvider";
import { useSocketListener } from "@/components/hooks/useSocketListener";
import { useSocketEvent } from "@/components/hooks/useSocketEvent";

export const HomePage = () => {
  const { updateGame } = useContext(GameContext);
  const router = useRouter();

  useSocketListener("game:create:success", () => {
    router.push("/game");
  });

  const createGame = useSocketEvent("game:create");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-gyparody text-white text-7xl md:text-8xl ">
        JEOPARDY!
      </h1>
      <div className="flex flex-col items-center gap-5">
        <Button
          className="bg-amber-400 hidden md:block"
          onClick={() => createGame()}
        >
          NEW GAME
        </Button>
        <Button className="bg-amber-400" onClick={() => router.push("/player")}>
          JOIN GAME
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
