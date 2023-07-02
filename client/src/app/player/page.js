"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  useSocketListener,
  useSocketEvent,
} from "@/components/hooks/useSocket";
import { PlayerContext } from "@/context/PlayerProvider";

const Player = () => {
  const [room_code, changeRoomCode] = useState("");
  const [name, changeName] = useState("");
  const [saved, changeSaved] = useState(false);
  const router = useRouter();

  const { player } = useContext(PlayerContext);

  useSocketListener("player:create:success", () => {
    changeSaved(true);
  });

  useSocketListener("game:start:success", (payload) => {
    router.push(`/game/${payload.room_code}`);
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
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center">
        <Button onClick={() => handleLeave()}>Back</Button>
        {saved === true && (
          <div className="text-white font-korinna text-3xl">
            <span className="text-amber-400">Room:</span> {room_code}
          </div>
        )}
      </div>
      <h1 className="text-white font-korinna text-4xl px-6 mt-20 text-center">
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
