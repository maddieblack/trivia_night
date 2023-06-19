"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useSocketListener } from "@/components/hooks/useSocketListener";
import { useSocketEvent } from "@/components/hooks/useSocketEvent";
import { PlayerContext } from "@/context/PlayerProvider";
import { GameContext } from "@/context/GameProvider";

const Player = () => {
  const [room_code, changeRoomCode] = useState("");
  const [name, changeName] = useState("");
  const [saved, changeSaved] = useState(false);
  const router = useRouter();

  const { player, updatePlayer } = useContext(PlayerContext);
  const { updateGame } = useContext(GameContext);

  useSocketListener("player:create:success", (payload) => {
    updatePlayer(payload.player);
    updateGame(payload.game);
    changeSaved(true);
  });

  const createPlayer = useSocketEvent("player:create");
  const deletePlayer = useSocketEvent("player:delete");

  const handleJoin = () => {
    createPlayer({ room_code, name });
  };

  const handleLeave = () => {
    if (saved) {
      deletePlayer({ room_code, _id: player._id });
    }
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col items-center pt-28 ">
      <Button className="absolute top-4 left-4" onClick={() => handleLeave()}>
        Back
      </Button>
      <h1 className="text-white font-korinna text-5xl md:text-7xl p-12 text-center">
        {saved === true
          ? `Hold tight, ${name}, other players are still joining the game.`
          : "Join game"}
      </h1>

      <div className="flex flex-col items-center gap-4 mt-4">
        {saved === false && (
          <>
            <Input
              label="Room code"
              value={room_code}
              onChange={(e) => changeRoomCode(e.target.value.toUpperCase())}
              placeholder="Room code"
              maxLength={5}
            />
            <Input
              label="Name"
              value={name}
              onChange={(e) => changeName(e.target.value)}
              placeholder="Name"
              maxLength={20}
            />
            <Button
              disabled={room_code.length !== 5 || !name}
              className="bg-amber-400"
              onClick={handleJoin}
            >
              JOIN GAME
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
