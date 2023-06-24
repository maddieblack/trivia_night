"use client";
import React, { createContext, useState } from "react";
import { useSocketListener } from "@/components/hooks/useSocketListener";
export const GameContext = createContext({ game: {}, updatedGame: null });

export const GameProvider = ({ children }) => {
  const [game, updateGame] = useState({});

  useSocketListener("game:create:success", ({ game }) => {
    updateGame(game);
  });

  useSocketListener("game:update:success", ({ game }) => {
    updateGame(game);
  });

  useSocketListener("game:fetch:success", ({ game }) => {
    updateGame(game);
  });

  return (
    <GameContext.Provider value={{ game, updateGame }}>
      {children}
    </GameContext.Provider>
  );
};
