"use client";
import React, { useContext } from "react";
import { GameContext } from "@/context/GameProvider";
import { useRouter } from "next/navigation";
import isEmpty from "lodash/isEmpty";
import { Button } from "@/components/Button";
import { RadioButtonGroup } from "@/components/RadioButton";
import { useRadioButtonGroup } from "@/components/RadioButton/useRadioButtonGroup";
import { useSocketListener } from "@/components/hooks/useSocketListener";
import { useSocketEvent } from "@/components/hooks/useSocketEvent";

export const GameHome = () => {
  const { game } = useContext(GameContext);
  const router = useRouter();

  const { value: judgeValue, changeValue: changeJudge } =
    useRadioButtonGroup(null);

  if (isEmpty(game)) {
    router.push("/");
  }

  const startGame = useSocketEvent("game:start");

  useSocketListener("game:start:success", (payload) => {
    router.push(`/game/${payload.room_code}`);
  });

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
        options={game.players
          .filter((p) => p.role !== "board")
          .map((p) => ({ label: p.name, value: p._id }))}
        onChange={changeJudge}
      />
      <div className="mt-10">
        {game.players?.length > 2 && !judgeValue && (
          <p className="mt-10 text-amber-400 text-3xl font-korinna">
            Please select a player to be the host!
          </p>
        )}
        {game.players?.length > 2 && judgeValue && (
          <Button
            onClick={() => startGame({ ...game, alex_trebek: judgeValue })}
          >
            Start game!
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameHome;
