"use client";
import React, { useContext, useEffect } from "react";
import { GameContext } from "@/context/GameProvider";
import { useRouter } from "next/navigation";
import isEmpty from "lodash/isEmpty";
import { Button } from "@/components/Button";

export const GameHome = () => {
  const { game, setGame } = useContext(GameContext);
  const router = useRouter();

  useEffect(() => {
    if (isEmpty(game)) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen ">
      <Button
        className="absolute top-4 left-4"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
      <h1 className="mt-10 flex flex-col items-center font-korinna">
        <span className="text-amber-400  text-3xl mb-1">Room Code:</span>
        <span className="text-white text-7xl">{game.room_code}</span>
      </h1>
    </div>
  );
};

export default GameHome;
