"use client";

import React, { useContext, useEffect } from "react";
import { GameContext } from "@/context/GameProvider";
import isEmpty from "lodash/isEmpty";
import { PlayerContext } from "@/context/PlayerProvider";
import { useSocketEvent } from "@/components/hooks/useSocketEvent";
import { Board, Host, Player } from "@/screens";

export const GameRoom = ({ params }) => {
  const { game } = useContext(GameContext);
  const { player } = useContext(PlayerContext);

  const fetchGame = useSocketEvent("game:fetch");
  const fetchPlayer = useSocketEvent("player:fetch");

  useEffect(() => {
    if (isEmpty(game) && isEmpty(player)) {
      fetchGame({
        room_code: params.room_code,
      });

      const id = sessionStorage.getItem(params.room_code);

      fetchPlayer({ _id: id });
    }
  }, []);

  if (player?.role === "board") return <Board />;
  if (player?.role === "alex_trebek") return <Host />;
  if (player?.role === "player") return <Player />;

  return <div>game started</div>;
};

export default GameRoom;
