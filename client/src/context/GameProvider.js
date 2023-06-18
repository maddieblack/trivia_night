"use client";
import React, { createContext, useState } from "react";
export const GameContext = createContext({ game: {}, setGame: null });

export const GameProvider = ({ children }) => {
  const [game, updateGame] = useState({});

  return (
    <GameContext.Provider value={{ game, updateGame }}>
      {children}
    </GameContext.Provider>
  );
};
