"use client";
import React, { createContext, useState } from "react";
import { useSocketListener } from "@/components/hooks/useSocketListener";
import { itsMe } from "@/utils/itsMe";
export const PlayerContext = createContext({ player: {}, updatePlayer: null });

export const PlayerProvider = ({ children }) => {
  const [player, updatePlayer] = useState({});

  useSocketListener(
    "player:update:success",
    ({ player, game: { room_code } }) => {
      if (itsMe(room_code, player)) {
        updatePlayer(player);
      }
    }
  );

  useSocketListener(
    "player:create:success",
    ({ player, game: { room_code } }) => {
      if (itsMe(room_code, player)) {
        sessionStorage.setItem(room_code, player._id);
        updatePlayer(player);
      }
    }
  );

  useSocketListener("player:fetch:success", ({ player }) => {
    updatePlayer(player);
  });

  return (
    <PlayerContext.Provider value={{ player, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
