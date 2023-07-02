import React, { useContext } from "react";

import { HereAreTheCategories } from "@/screens/Board/HereAreTheCategories";
import { GameContext } from "@/context/GameProvider";
import { steps } from "@/constants";
import { Button } from "@/components/Button";
import { JeopardyBoard } from "@/screens/Board/JeopardyBoard";

export const Board = () => {
  const { game, updateGame } = useContext(GameContext);

  const getPage = () => {
    if (game._id) {
      switch (game.step) {
        case steps.CATEGORIES_JEOPARDY:
          return <HereAreTheCategories round="jeopardy" />;
        case steps.JEOPARDY_BOARD:
          return <JeopardyBoard round="jeopardy" />;
        default:
          return (
            <div>
              <Button
                onClick={() =>
                  updateGame({ ...game, step: steps.CATEGORIES_JEOPARDY })
                }
              >
                Start game
              </Button>
            </div>
          );
      }
    }

    return <div>LOADING GAME</div>;
  };

  return <div>{React.cloneElement(getPage(), { game, updateGame })}</div>;
};
