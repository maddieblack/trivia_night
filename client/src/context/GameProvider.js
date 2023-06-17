"use client";
import React, { createContext, useState } from "react";
export const GameContext = createContext({ game: {}, setGame: null });

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({});

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};
