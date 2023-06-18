"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { socket } from "@/services/socket";

const Player = () => {
  const [room_code, changeRoomCode] = useState("");
  const [name, changeName] = useState("");
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center pt-28 ">
      <Button
        className="absolute top-4 left-4"
        onClick={() => router.push("/")}
      >
        Back
      </Button>
      <h1 className="text-white font-korinna text-5xl md:text-7xl">
        Join game
      </h1>

      <div className="flex flex-col items-center gap-4 mt-4">
        <Input
          label="Room code"
          value={room_code}
          onChange={(e) => changeRoomCode(e.target.value)}
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
          onClick={() => socket.emit("player:create", { room_code, name })}
        >
          JOIN GAME
        </Button>
      </div>
    </div>
  );
};

export default Player;
