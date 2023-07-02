"use client";
import { useContext } from "react";
import { GameContext } from "@/context/GameProvider";
import { useRouter } from "next/navigation";
import { useRadioButtonGroup } from "@/components/RadioButton/useRadioButtonGroup";
import { useSocketListener } from "@/components/hooks/useSocket";
import { Button } from "@/components/Button";
import { RadioButtonGroup } from "@/components/RadioButton";
import { steps } from "@/constants";
import { useInitialLoad } from "@/components/hooks/useInitialLoad";
import { FullScreenLoader } from "@/components/FullScreenLoader";

const Lobby = ({ params }) => {
  const { game, startGame, loading: gameLoading } = useContext(GameContext);
  const router = useRouter();

  const { loading } = useInitialLoad(params.room_code);

  const { value: judgeValue, changeValue: changeJudge } =
    useRadioButtonGroup(null);

  useSocketListener("game:start:success", (payload) => {
    router.push(`/game/${payload.room_code}`);
  });

  if (loading || gameLoading) return <FullScreenLoader />;

  return (
    <div className="flex flex-col items-center h-screen ">
      <Button
        className="absolute top-4 left-4"
        onClick={() => router.push("/")}
      >
        Back
      </Button>
      <h1 className="mt-10 flex flex-col items-center font-korinna tv:mt-20">
        <span className="text-amber-400  text-3xl mb-1 tv:text-7xl tv:mb-8">
          Room Code:
        </span>
        <span className="text-white text-7xl tv:text-jumbo">
          {game.room_code}
        </span>
      </h1>
      <h2 className="mt-10 mb-5">
        <span className="text-amber-400 text-3xl mb-1 font-korinna tv:text-7xl tv:mb-5">
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
      <div className="mt-10 tv:mt-16">
        {game.players?.length > 3 && !judgeValue && (
          <p className="mt-10 text-amber-400 text-3xl font-korinna tv:text-7xl">
            Please select a player to be the host!
          </p>
        )}
        {game.players?.length > 3 && judgeValue && (
          <Button
            onClick={() =>
              startGame({
                ...game,
                alex_trebek: judgeValue,
                step: steps.CATEGORIES_JEOPARDY,
              })
            }
          >
            Start game!
          </Button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
