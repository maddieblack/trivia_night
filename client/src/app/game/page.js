"use client";
import React, { useContext, useEffect } from "react";
import { GameContext } from "@/context/GameProvider";
import { useRouter } from "next/navigation";
import isEmpty from "lodash/isEmpty";
import { Button } from "@/components/Button";
import { RadioButtonGroup } from "@/components/RadioButton";
import { useRadioButtonGroup } from "@/components/RadioButton/useRadioButtonGroup";
import { socket } from "@/services/socket";

export const GameHome = () => {
  const { game, updateGame } = useContext(GameContext);
  const router = useRouter();

  const { value: judgeValue, changeValue: changeJudge } =
    useRadioButtonGroup(null);

  if (isEmpty(game)) {
    router.push("/");
  }

  useEffect(() => {
    socket.on("player:create:success", (payload) => updateGame(payload));

    socket.on("game:create:success", (payload) => {
      updateGame(payload);
      router.push("/game");
    });

    return () => {
      socket.off("player:create:success");
      socket.off("game:create:success");
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen ">
      <Button
        className="absolute top-4 left-4"
        onClick={() => router.push("/")}
      >
        Back
      </Button>
      <h1 className="mt-10 flex flex-col items-center font-korinna">
        <span className="text-amber-400  text-3xl mb-1">Room Code:</span>
        <span className="text-white text-7xl">{game.room_code}</span>
      </h1>
      <h2 className="mt-10 mb-5">
        <span className="text-amber-400 text-3xl mb-1 font-korinna">
          Players:
        </span>
      </h2>
      <RadioButtonGroup
        value={judgeValue}
        options={game.players.map((p) => ({ label: p.name, value: p.name }))}
        onChange={(value) => {
          console.log("running", value);
          changeJudge(value);
        }}
      />
    </div>
  );
};

export default GameHome;
