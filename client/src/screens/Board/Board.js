import React, { useContext } from "react";

import { HereAreTheCategories } from "@/screens/Board/HereAreTheCategories";
import { GameContext } from "@/context/GameProvider";
import { events } from "@/constants";
import { Button } from "@/components/Button";
import { JeopardyBoard } from "@/screens/Board/JeopardyBoard";
import sortBy from "lodash/sortBy";
import { PlayerContext } from "@/context/PlayerProvider";

export const Board = () => {
  const { game, updateGame } = useContext(GameContext);
  const { player } = useContext(PlayerContext);

  const lastEvent = sortBy(game.logs, "createdAt").reverse()[0]?.event;

  const getPage = () => {
    if (game._id) {
      switch (lastEvent) {
        case events.INITIALIZE:
          return <HereAreTheCategories round="jeopardy" />;
        case events.HERE_ARE_THE_CATEGORIES_J:
          return <JeopardyBoard round="jeopardy" />;
        default:
          return <div>BROKEN</div>;
      }
    }

    return <div>LOADING GAME</div>;
  };

  return (
    <div>{React.cloneElement(getPage(), { game, updateGame, player })}</div>
  );
};
