"use client";

import React, { useContext } from "react";
import { Board, Host, Player } from "@/screens";
import { useInitialLoad } from "@/components/hooks/useInitialLoad";
import { PlayerContext } from "@/context/PlayerProvider";
import { FullScreenLoader } from "@/components/FullScreenLoader";

export const GameRoom = ({ params }) => {
  const { loading } = useInitialLoad(params.room_code);
  const { player } = useContext(PlayerContext);

  if (loading) return <FullScreenLoader />;

  if (player?.role === "board") return <Board />;
  if (player?.role === "alex_trebek") return <Host />;
  if (player?.role === "player") return <Player />;

  return <div>game started</div>;
};

export default GameRoom;
