"use client";
import React, { createContext, useState } from "react";
export const PlayerContext = createContext({ player: {}, updatePlayer: null });

export const PlayerProvider = ({ children }) => {
  const [player, updatePlayer] = useState({});

  return (
    <PlayerContext.Provider value={{ player, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
