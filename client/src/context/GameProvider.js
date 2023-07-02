"use client";
import React, { createContext, useState } from "react";
import { useSocket } from "@/components/hooks/useSocket";
export const GameContext = createContext({ game: {}, updatedGame: null });

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlers = [setLoading, setError];

  const fetchGame = useSocket(
    "game:fetch",
    ({ game: newGame }) => {
      setGame(newGame);
    },
    ...handlers
  );

  const updateGame = useSocket(
    "game:update",
    ({ game: newGame }) => {
      setGame(newGame);
    },
    ...handlers
  );
  const createGame = useSocket(
    "game:create",
    ({ game: newGame }) => {
      setGame(newGame);
    },
    ...handlers
  );
  const startGame = useSocket(
    "game:start",
    (payload) => {
      setGame(payload);
    },
    ...handlers
  );

  const handleStartGame = (game) => {
    setLoading(true);
    startGame(game);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame,
        createGame,
        startGame: handleStartGame,
        loading,
        fetchGame,
      }}
    >
      {children}
      {error && (
        <div className="bg-red-700 bottom-0 absolute w-full text-center p-3">
          {JSON.stringify(error)}
        </div>
      )}
    </GameContext.Provider>
  );
};
