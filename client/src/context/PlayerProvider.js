"use client";
import React, { createContext, useState } from "react";
import { useSocket } from "@/components/hooks/useSocket";
import { itsMe } from "@/utils/itsMe";
export const PlayerContext = createContext({ player: {}, updatePlayer: null });

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handlers = [setLoading, setError];

  useSocket(
    "player:fetch",
    ({ player }) => {
      setPlayer(player);
    },
    ...handlers
  );

  const updatePlayer = useSocket(
    "player:update",
    ({ player, game: { room_code } }) => {
      if (itsMe(room_code, player)) {
        setPlayer(player);
      }
    },
    ...handlers
  );

  const createPlayer = useSocket(
    "player:create",
    ({ player, game: { room_code } }) => {
      if (itsMe(room_code, player)) {
        // eslint-disable-next-line no-undef
        sessionStorage.setItem(room_code, player._id);
        setPlayer(player);
      }
    },
    ...handlers
  );

  return (
    <PlayerContext.Provider
      value={{ player, updatePlayer, createPlayer, loading, error }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
